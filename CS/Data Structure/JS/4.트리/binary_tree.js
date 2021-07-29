class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    let newNode = new Node(data, null, null);
    if (!this.root) {
      this.root = newNode;
    } else {
      let curr = this.root;
      while (curr) {
        if (data === curr.data) {
          return "데이터 중복";
        }
        if (data < curr.data) {
          if (!curr.left) {
            curr.left = newNode;
            break;
          }
          curr = curr.left;
        } else if (data > curr.data) {
          if (!curr.right) {
            curr.right = newNode;
            break;
          }
          curr = curr.right;
        }
      }
    }
  }

  preOrder(node) {
    if (!(node == null)) {
      console.log(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }
  inOrder(node) {
    if (!(node == null)) {
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }
  postOrder(node) {
    if (!(node == null)) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  }
  search(data) {
    let curr = this.root;
    if (!this.root) {
      return;
    } else {
      while (curr) {
        if (curr.data == data) {
          return curr;
        }
        if (data > curr.data) {
          curr = curr.right;
        } else curr = curr.left;
      }
    }
    return curr;
  }

  delete(data) {
    //자식노드가 없을 때
    //하나만 있을 때
    //둘 다 있을 때
    let curr = this.root;
    let pos = "";
    let pNode;
    if (!this.root) {
      return "";
    }
    while (curr) {
      pNode = curr;
      if (data < curr.data) {
        curr = curr.left;
        pos = "LEFT";
      }
      if (data > curr.data) {
        curr = curr.right;
        pos = "RIGHT";
      }
      if (curr.data === data) {
        break;
      }
    }
    //p는 curr 부모노드
    //curr은 지워야할 노드
    if (!curr.left && !curr.right) {
      //자식이 없을 때
      curr = null;
      return;
    } else if (curr.left && curr.right) {
      //자식이 둘다 있을 떄
      //curr이 삭제되어야할 노드

      let maxNode = curr.left; //왼쪽자식중
      while (maxNode.right) {
        maxNode = maxNode.right;
      } //제일 큰 값의 노드
      
      if (pos == "LEFT") {
        pNode.left = maxNode;
      }
      if (pos == "RIGHT") {
        pNode.right = maxNode;
      }
      //maxNode의 자식이 없는 경우
      if (!maxNode.left) { 
        curr = null;
        return this;
      }
      //자식이 있는 경우
      if (maxNode.left) {
        curr.left.right = maxNode.left;
      }
    } else if (curr.left) {
      pos == "LEFT" ? (pNode.left = curr.left) : (pNode.right = curr.left);
    } else if (curr.right) {
      pos == "LEFT" ? (pNode.left = curr.right) : (pNode.right = curr.right);
    }
  }
}

let bst = new BinarySearchTree();

bst.insert(15);
bst.insert(10);
bst.insert(5);
bst.insert(13);
bst.insert(3);
bst.insert(20);
bst.insert(17);
bst.insert(23);

console.log(bst.delete(10));
bst.preOrder(bst.root);
