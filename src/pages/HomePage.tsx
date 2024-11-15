import React from 'react'
interface HomePageProps {
    isLoggedIn: boolean;
    threadfeed: {id: number; title: string; content: string }[];
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, threadfeed }) => {
    return (
        <div>
            <h1>Welcome {isLoggedIn ? "Back" : "Guest"}!</h1>
            {threadfeed.map((thread) => (
                <div key={thread.id}>
                    <h2>{thread.title}</h2>
                    <p>{thread.content}</p>
                </div>
            ))}
        </div>
    );

};

export default HomePage;