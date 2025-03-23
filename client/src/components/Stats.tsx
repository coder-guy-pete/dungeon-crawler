import React from 'react';

interface StatsProps {
    stats: { [key: string]: number };
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
    return (
        <div>
        <h3>Stats</h3>
        <p>{JSON.stringify(stats)}</p>
        </div>
    );
};

export default Stats;