import { useState } from 'react';
import { useReward } from 'react-rewards';
import CardHeading from './CardHeading';
import LoginView from './LoginView';
import WalletView from './WalletView';
import { motion } from 'framer-motion';

function App() {
    const { reward } = useReward('confettiId', 'confetti', {
        lifetime: 300,
        colors: ['#57bf9d', '#ffffff', '#09081a'], // fuel colors
    });
    const downloadTxtFile = () => {
        const element = document.createElement('a');
        const file = new Blob(
            ['0x976e5c3fa620092c718d852ca703b6da9e3075b9f2ecb8ed42d9f746bf26aafb'],
            { type: 'text/plain' },
        );
        element.href = URL.createObjectURL(file);
        element.download = 'Backup Key - DO NOT SHARE.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const [showSend, setShowSend] = useState(false);

    const onSubmit = (data: any) => {
        downloadTxtFile(); // download the backup file
        setShowSend(true);
    };

    const onFinale = async (data: any) => {
        const runTx = await fetch('http://localhost:5005/sendtx', {
            method: 'GET', // default, so we can ignore
        });
        console.log('Finished running tx', runTx);

        reward(); // confetti
    };

    return (
        <div className="h-screen bg-green-100 w-100">
            {/* <img
                alt=""
                src="./logo.webp"
                style={{
                    maxWidth: 100,
                    textAlign: 'center',
                    margin: '0 auto',
                    borderRadius: '50%',
                }}
            /> */}
            {showSend ? (
                <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
                    <CardHeading heading="Authsome" subHeading="Transfer your assets." />
                    <WalletView onSubmit={onFinale} />
                </div>
            ) : (
                <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
                    <CardHeading
                        heading="Authsome"
                        subHeading="Create your multi-sig wallet."
                    />
                    <LoginView onSubmit={onSubmit} />
                </div>
            )}
        </div>
    );
}

export default App;
