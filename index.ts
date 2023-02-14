import { WalletWithKeychains } from 'bitgo';
import axios from 'axios';

const iterations = 50;
const api = axios.create({ 
	baseURL: 'http://localhost:3000/api',
});

const main = async () => {
	const wallets: string[] = [];
	for (let i = 1; i <= iterations; i++) {
		const { data } = await api.get<WalletWithKeychains>('wallet/create');
		wallets.push(data.wallet.id as unknown as string);
	}

	await Promise.all(wallets.map(wallet => 
		new Promise(async resolve => {
			console.time(`Claim ${wallet}`);
			const { data } = await api.get(`wallet/${wallet}/claim`);
			console.timeEnd(`Claim ${wallet}`);
			resolve({});
		})
	))
}

main();
