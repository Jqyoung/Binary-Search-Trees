import Tree from "./tree.js";

const testArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
const tree = new Tree(testArr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomNumbers(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 100);
    arr.push(num);
  }
  return arr;
}

prettyPrint(tree.root);
tree.insert(11);
prettyPrint(tree.root);
tree.delete(9);
prettyPrint(tree.root);
tree.delete(7);
prettyPrint(tree.root);

console.log("test find method: ", tree.find(4));

console.log("test levelOrder traversal: ");
tree.levelOrder((t) => {
  console.log(t.data);
});

console.log("test preOrder: ");
tree.preOrder((node) => {
  console.log(node.data);
});

console.log("test inOrder: ");
tree.inOrder((node) => {
  console.log(node.data);
});

console.log("test postOrder: ");
tree.postOrder((node) => {
  console.log(node.data);
});

console.log("test height: ", tree.height(2));

console.log("test depth: ", tree.depth(11));

console.log("test if the tree is balanced", tree.isBalanced());

console.log("\n");
// the final test according to the project requirement
console.log(
  "This is the start of the test specified in the project instruction"
);

// Create a binary search tree from an array of random numbers < 100.
const testArr2 = randomNumbers(10);
console.log("Test array used to build the balanced binary search tree: ");
console.log(testArr2);
const binarySearchTree = new Tree(testArr2);
prettyPrint(binarySearchTree.root);

// Confirm that the tree is balanced by calling isBalanced.
let checkBalance = binarySearchTree.isBalanced();
console.log("Is the tree balanced?", checkBalance);

// Print out all elements in level, pre, post, and in order.
console.log("levelOrder:");
console.log(binarySearchTree.levelOrder());
console.log("preOrder:");
console.log(binarySearchTree.preOrder());
console.log("postOrder:");
console.log(binarySearchTree.postOrder());
console.log("inOrder:");
console.log(binarySearchTree.inOrder());

// Unbalance the tree by adding several numbers > 100.
binarySearchTree.insert(105);
binarySearchTree.insert(150);
binarySearchTree.insert(168);
binarySearchTree.insert(200);
binarySearchTree.insert(280);
binarySearchTree.insert(360);
console.log("Add values greater than 100 to unbalance the tree:");
prettyPrint(binarySearchTree.root);

// Confirm that the tree is unbalanced by calling isBalanced.
checkBalance = binarySearchTree.isBalanced();
console.log("Is the tree balanced?", checkBalance);

// Balance the tree by calling rebalance.
binarySearchTree.reBalance();
console.log("Rebalanced the tree");
prettyPrint(binarySearchTree.root);

// Confirm that the tree is balanced by calling isBalanced.
checkBalance = binarySearchTree.isBalanced();
console.log("Is the tree balanced?", checkBalance);

// Print out all elements in level, pre, post, and in order.
console.log("levelOrder:");
console.log(binarySearchTree.levelOrder());
console.log("preOrder:");
console.log(binarySearchTree.preOrder());
console.log("postOrder:");
console.log(binarySearchTree.postOrder());
console.log("inOrder:");
console.log(binarySearchTree.inOrder());
