import * as vscode from 'vscode';


const events = ["JOIN","QUIT","DEATH","KILL","RESPAWN","GROUP_CHANGE","PVP_STATE_CHANGE","FISH_CAUGHT","PORTAL_USE","DAMAGE","BLOCK_BREAK","PARKOUR_START","PARKOUR_FINISH","DROP_ITEM","PICKUP_ITEM","CHANGE_HELD_ITEM","TOGGLE_SNEAK","TOGGLE_FLIGHT"]
const keywords = ["house", "handle", "global", "player", "let", "if", "else", "int", "bool"].concat(events);

export function activate(ctx: vscode.ExtensionContext): void {
    ctx.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('housify', {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
                const keywordComplition = keywords.map(keyword => ({
                    label: keyword,
                    kind: vscode.CompletionItemKind.Keyword,
                    insertText: keyword
                } as vscode.CompletionItem));
                const snippetCompletion = events.map(event => (
                    {
                        label: event + "-handle",
                        kind: vscode.CompletionItemKind.Snippet,
                        insertText: new vscode.SnippetString("handle "+event+" \{\n\t${0}\n\}")
                    }
                ) as vscode.CompletionItem);
                const simpleCompletion = [new vscode.CompletionItem('Hello World!')];
                return keywordComplition.concat(snippetCompletion);
            }
        }));
}

export function deactivate() {}