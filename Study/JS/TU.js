function Stack() {
    var items = [];
    this.push = function(item) {
        items.push(item)
    }
    this.pop = function() {
        return items.pop()
    }
    this.peek = function() {
        return items[items.length - 1]
    }
    this.isEmpty = function() {
        return items.length == 0
    }
    this.size = function() {
        return items.length
    }
    this.clear = function() {
        items = []
    }
    this.printf = function() {
        console.log(items.toString())
    }
    this.divideBy2 = function(decNumber) {
        var remStack = new Stack(),
            rem,
            binaryString = '';
        while (decNumber > 0) {
            rem = Math.floor(decNumber % 2);
            remStack.push(rem);
            decNumber = Math.floor(decNumber / 2)
        }
        while (!remStack.isEmpty()) {
            binaryString += remStack.pop().toString()
        }
        return binaryString
    }
}

function Queue() {
    var items = [];
    this.enqueue = function(element) {
        items.push(element)
    }
    this.dequeue = function(element) {
        return items.shift();
    }
    this.front = function() {
        return items[0]
    }
    this.isEmpty = function() {
        return items.length == 0
    }
    this.size = function() {
        return items.length
    }
    this.printf = function() {
        console.log(items.toString())
    }
    this.print = function() {
        console.log(items.toString())
    }
}


function Dictionary() {
    var items = {};
    this.has = function(key) {
        return key in items
    }
    this.set = function(key, value) {
        items[key] = value
    }
    this.remove = function(key) {
        if (this.has(key)) {
            delete items[key];
            return true
        }
        return false
    }
    this.get = function(key) {
        return this.has(key) ? items[key] : undefined
    }
    this.values = function() {
        var values = [];
        for (var key in items) {
            if (this.has(key)) {
                values.push(items[key])
            }
        }
        return values
    }
    this.getItems = function() {
        return items
    }
    this.size = function() {
        return Object.keys(items).length
    }
    this.clear = function() {
        this.items = {}
    }
    this.keys = function() {
        return Object.keys(items)
    }
}

function Graph() {
    var vertices = [];
    var adjList = new Dictionary();
    this.addVertex = function(v) {
        vertices.push(v);
        adjList.set(v, []);
    }
    this.addEdge = function(v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    }
    this.toString = function() {
        var s = '';
        for (var i = vertices.length - 1; i >= 0; i--) {
            s += vertices[i] + '->';
            var neighbors = adjList.get(vertices[i]);
            for (var j = neighbors.length - 1; j >= 0; j--) {
                s += neighbors[j] + '';
            };
            s += '\n';
        };
        return s;
    }

    this.bfs = function(v, callback) {
        var color = initializeColor(),
            queue = new Queue();
        queue.enqueue(v);
        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'grey';
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'grey';
                    queue.enqueue(w);
                }
            };
            color[u] = 'black';
            if (callback) {
                callback(u);
            }
        }
    }

    this.shortBFS = function(v) {
        var color = initializeColor(),
            queue = new Queue(),
            d = [],
            pred = [];
        queue.enqueue(v);
        for (var i = 0; i < vertices.length; i++) {
            d[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        while (!queue.isEmpty()) {
            var u = queue.dequeue(),
                neighbors = adjList.get(u);
            color[u] = 'gery';
            for (var i = 0; i < neighbors.length; i++) {
                var w = neighbors[i];
                if (color[w] === 'white') {
                    color[w] = 'gery';
                    d[w] = d[u] + 1;
                    pred[w] = u;
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
        }
        return {
            distances: d,
            predecessors: pred
        }
    }

    this.dfs = function(callback) {
        var color = initializeColor();
        for (var i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                dfsVisit(vertices[i], color, callback);
            }
        }
    }


    var dfsVisit = function(u, color, callback) {
        color[u] = 'gery';
        if (callback) {
            callback(u);
        }
        var neighbors = adjList.get(u);
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i];
            if (color[w] === 'white') {
                dfsVisit(w, color, callback);
            }
        }
        color[u] = 'black';
    }



    var time = 0;
    this.DFS = function() {
        var color = initializeColor(),
            d = [],
            f = [],
            p = [];
        time = 0;
        for (var i = 0; i < vertices.length; i++) {
            f[vertices[i]] = 0;
            d[vertices[i]] = 0;
            p[vertices[i]] = null;

        }
        for (i = 0; i < vertices.length; i++) {
            if (color[vertices[i]] === 'white') {
                DFSVisit(vertices[i], color, d, f, p);
            }
        }
        return {
            discovery: d,
            finished: f,
            predecsssors: p
        }
    }
    var DFSVisit = function(u, color, d, f, p) {
        console.log('discoverd      ' + u);
        color[u] = 'gery';
        d[u] = ++time;
        var neighbors = adjList.get(u);
        for (var i = 0; i < neighbors.length; i++) {
            var w = neighbors[i];
            if (color[w] === 'white') {
                p[w] = u;
                DFSVisit(w, color, d, f, p);

            }
        }
        color[u] = 'black';
        f[u] = ++time;
        console.log('explored    ' + u);
    }

}
var graph = new Graph();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'H', 'I'];
for (var i = 0, length1 = myVertices.length; i < length1; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');


console.log(graph.toString());

var initializeColor = function() {
    var color = [];
    for (var i = 0; i < myVertices.length; i++) {
        color[myVertices[i]] = 'white';
    };
    return color;
};

function printNode(value) {
    console.log("VIsited vertex:" + value);
}
console.log('---------------')
graph.bfs(myVertices[0], printNode);
console.log('---------------')
var shortestPathA = graph.shortBFS(myVertices[0]);
console.log(shortestPathA);
console.log('---------------')

var fromVertex = myVertices[0];
for (var i = 0; i < myVertices.length; i++) {
    var toVertex = myVertices[i],
        path = new Stack();
    for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        path.push(v);
    }
    path.push(fromVertex);
    var s = path.pop();
    while (!path.isEmpty()) {
        s += '-' + path.pop();
    }
    console.log(s);
}

console.log('---------------')

graph.dfs(printNode);

console.log('---------------')
graph.DFS();
