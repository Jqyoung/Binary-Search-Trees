import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr, start = 0, end, sortFlag = false) {
    if (sortFlag === false) {
      arr = this.removeDuplicate(arr);
      arr = this.sortArray(arr);
      end = arr.length - 1;
      sortFlag = true;
    }

    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let rootPointer = new Node(arr[mid]);

    rootPointer.left = this.buildTree(arr, start, mid - 1, sortFlag);
    rootPointer.right = this.buildTree(arr, mid + 1, end, sortFlag);

    return rootPointer;
  }

  removeDuplicate(arr) {
    return [...new Set(arr)];
  }

  sortArray(arr) {
    if (arr.length === 1) {
      return arr;
    }

    let mid = arr.length / 2;
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    let sortedLeft = this.sortArray(left);
    let sortedRight = this.sortArray(right);

    // merge
    let i = 0;
    let j = 0;
    let newArr = [];
    while (i < sortedLeft.length && j < sortedRight.length) {
      if (sortedLeft[i] > sortedRight[j]) {
        newArr.push(sortedRight[j]);
        j++;
      } else if (sortedLeft[i] < sortedRight[j]) {
        newArr.push(sortedLeft[i]);
        i++;
      }
    }
    // add the remaining elements in the left or right sorted array to the resulting array
    while (i < sortedLeft.length) {
      newArr.push(sortedLeft[i]);
      i++;
    }

    while (j < sortedRight.length) {
      newArr.push(sortedRight[j]);
      j++;
    }

    return newArr;
  }

  insert(value, pointer = this.root) {
    if (pointer.left === null && pointer.right === null) {
      if (value < pointer.data) {
        pointer.left = new Node(value);
      } else if (value > pointer.data) {
        pointer.right = new Node(value);
      }
      return;
    }

    if (value < pointer.data) {
      this.insert(value, pointer.left);
    } else if (value > pointer.data) {
      this.insert(value, pointer.right);
    } else if (value === pointer.data) {
      return;
    }
  }

  delete(value, pointer = this.root) {
    if (pointer === null) {
      return pointer;
    }

    if (value < pointer.data) {
      pointer.left = this.delete(value, pointer.left);
      return pointer;
    } else if (value > pointer.data) {
      pointer.right = this.delete(value, pointer.right);
      return pointer;
    }

    if (pointer.right === null && pointer.left === null) {
      return null;
    }

    if (pointer.right !== null && pointer.left === null) {
      return pointer.right;
    } else if (pointer.left !== null && pointer.right === null) {
      return pointer.left;
    }

    if (pointer.right !== null && pointer.left !== null) {
      let temp = pointer;
      let pre = pointer;
      pointer = pointer.right;

      if (pointer.left === null) {
        pre.right = pointer.right;
        temp.data = pointer.data;
        return temp;
      }

      while (pointer.left !== null) {
        pre = pointer;
        pointer = pointer.left;
      }

      pre.left = pointer.right;
      temp.data = pointer.data;
      return temp;
    }
  }

  find(value, pointer = this.root) {
    if (pointer === null) {
      return null;
    }
    if (pointer.data === value) {
      return pointer;
    }

    // recursive case
    if (pointer.data < value) {
      return this.find(value, pointer.right);
    } else if (pointer.data > value) {
      return this.find(value, pointer.left);
    }
  }

  levelOrder(callback) {
    if (this.root === null) return;

    let arr = [];
    let queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      let currentNode = queue[0];

      if (callback) {
        callback(currentNode);
      }

      arr.push(currentNode.data);
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
      queue.shift();
    }

    if (!callback) {
      return arr;
    }
  }

  preOrder(callback, pointer = this.root, arr = []) {
    if (pointer === null) return;

    if (callback) {
      callback(pointer);
    }

    arr.push(pointer.data);

    this.preOrder(callback, pointer.left, arr);
    this.preOrder(callback, pointer.right, arr);

    if (!callback) {
      return arr;
    }
  }

  inOrder(callback, pointer = this.root, arr = []) {
    if (pointer === null) return;

    this.inOrder(callback, pointer.left, arr);
    if (callback) {
      callback(pointer);
    }
    arr.push(pointer.data);
    this.inOrder(callback, pointer.right, arr);

    if (!callback) {
      return arr;
    }
  }

  //deferred
  postOrder(callback, pointer = this.root, arr = []) {
    if (pointer === null) return;

    this.postOrder(callback, pointer.left, arr);
    this.postOrder(callback, pointer.right, arr);
    if (callback) {
      callback(pointer);
    }
    arr.push(pointer.data);

    if (!callback) {
      return arr;
    }
  }

  height(node, countL = 0, countR = 0, flag = false, highest) {
    if (flag !== true) {
      node = this.find(node);
      flag = true;
    }

    if (node === null) {
      return -1;
    }

    countL = this.height(node.left, countL, countR, true) + 1;
    countR = this.height(node.right, countL, countR, true) + 1;

    if (countL > countR) {
      highest = countL;
      return highest;
    } else {
      highest = countR;
      return highest;
    }
  }

  depth(node, flag, target, counter = 0) {
    if (flag !== true) {
      target = this.find(node);
      node = this.root;
      flag = true;
    }

    if (node === null) {
      return null;
    } else if (node.data === target.data) {
      return counter;
    }

    if (node.data > target.data) {
      counter++;
      return this.depth(node.left, true, target, counter);
    } else if (node.data < target.data) {
      counter++;
      return this.depth(node.right, true, target, counter);
    }
  }

  isBalanced() {
    let leftHeight = this.height(this.root.left.data);
    let rightHeight = this.height(this.root.right.data);
    let diff = Math.abs(leftHeight - rightHeight);

    if (diff > 1) {
      return false;
    } else return true;
  }

  reBalance() {
    const newArr = this.preOrder();
    this.root = this.buildTree(newArr);
  }
}
