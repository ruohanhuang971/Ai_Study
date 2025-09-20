import concurrently from 'concurrently'; // start multiple application with a single command

// give an array of commands, each command for starting one application
concurrently([
    {
        name: 'server',
        command: 'bun run dev',
        cwd: 'packages/server', // current working directory
        prefixColor: 'cyan' // differentiate between server and client messages by color
    },
    {
        name: 'client',
        command: 'bun run dev',
        cwd: 'packages/client',
        prefixColor: 'green'
    }
]);

// to run both commands -> run index.ts from root directory