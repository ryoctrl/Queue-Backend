module.exports = {
    apps: [
        {
            name: 'MOAP-Queue',
            script: 'npm',
            args: 'start',
            watch: true,
            env: {
                PORT: 9507
            }
        }
    ]
};
