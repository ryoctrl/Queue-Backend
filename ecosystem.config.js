module.exports = {
    apps: [
        {
            name: 'QueueAPI',
            script: 'npm',
            args: 'start',
            watch: true,
            env: {
                PORT: 9506
            }
        }
    ]
};
