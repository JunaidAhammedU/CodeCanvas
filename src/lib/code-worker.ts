const executeCode = (code: string) => {
    try {
        // Override console methods to capture output
        const outputs: string[] = [];
        const console = {
            log: (...args: unknown[]) => {
                outputs.push(args.map(arg =>
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '));
            },
            error: (...args: unknown[]) => {
                outputs.push(`Error: ${args.join(' ')}`);
            },
            warn: (...args: unknown[]) => {
                outputs.push(`Warning: ${args.join(' ')}`);
            }
        };

        // Execute code in a new Function context with console overrides
        new Function('console', code)(console);

        return { success: true, output: outputs };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            error: errorMessage,
            output: [`Error: ${errorMessage}`]
        };
    }
};

self.addEventListener('message', (event) => {
    const result = executeCode(event.data);
    self.postMessage(result);
});