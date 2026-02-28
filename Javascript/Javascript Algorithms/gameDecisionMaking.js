// score: >0 zmaga AI, <0 zmaga igralec, 0 neodločeno
function minimax(node, depth, alpha, beta, isMaximizing) {
    if (depth === 0 || node.isTerminal()) return node.evaluate();

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let child of node.getMoves()) {
            let eval = minimax(child, depth - 1, alpha, beta, false);
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) break; // Pruning
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let child of node.getMoves()) {
            let eval = minimax(child, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) break; // Pruning
        }
        return minEval;
    }
}
console.log("Minimax (Alpha-Beta) pripravljen.");


class GuardNPC {
    constructor() {
        this.state = 'IDLE';
    }

    update(playerDistance) {
        switch (this.state) {
            case 'IDLE':
                if (playerDistance < 10) this.state = 'CHASE';
                break;
            case 'CHASE':
                if (playerDistance < 2) this.state = 'ATTACK';
                else if (playerDistance > 15) this.state = 'IDLE';
                break;
            case 'ATTACK':
                if (playerDistance > 3) this.state = 'CHASE';
                break;
        }
        console.log(`NPC State: ${this.state}`);
    }
}

const guard = new GuardNPC();
guard.update(8); // Preklop v CHASE


const actions = [
    { name: 'Eat', score: (npc) => npc.hunger * 2 },
    { name: 'Sleep', score: (npc) => npc.fatigue * 1.5 },
    { name: 'Patrol', score: (npc) => 10 } // Osnovna želja
];

function decideAction(npc) {
    let bestAction = actions.reduce((prev, curr) => 
        curr.score(npc) > prev.score(npc) ? curr : prev
    );
    console.log(`NPC se je odločil za: ${bestAction.name}`);
}

decideAction({ hunger: 8, fatigue: 2 }); // Verjetno bo jedel


const BT = {
    SUCCESS: 'SUCCESS',
    RUNNING: 'RUNNING',
    FAILURE: 'FAILURE'
};

// Enostavno zaporedje dejanj
class Sequence {
    constructor(nodes) { this.nodes = nodes; }
    tick() {
        for (let node of this.nodes) {
            let status = node.tick();
            if (status !== BT.SUCCESS) return status;
        }
        return BT.SUCCESS;
    }
}

const checkHealth = { tick: () => { console.log("Zdravje OK"); return BT.SUCCESS; } };
const patrol = { tick: () => { console.log("Patruljiram..."); return BT.SUCCESS; } };

const root = new Sequence([checkHealth, patrol]);
root.tick();

const actionsPool = [
    { name: "GetWood", pre: { hasAxe: true }, post: { hasWood: true } },
    { name: "BuyAxe", pre: { hasMoney: true }, post: { hasAxe: true } }
];

function plan(startState, goalState) {
    // V realnem svetu bi tukaj uporabili A* za iskanje poti med stanji
    console.log("GOAP načrtuje pot od denarja do lesa...");
    return ["BuyAxe", "GetWood"];
}

console.log("GOAP Načrt:", plan({ hasMoney: true }, { hasWood: true }));


