


class TreeBuilder {
  rootId;

  items;

  constructor(rootId) {
    const rootItem = this._createItem(`${rootId}`);
    this.rootId = rootItem.id;
    this.items = {
      [rootItem.id]: rootItem,
    };
  }

  withLeaf(id) {
    const leafItem = this._createItem(`${this.rootId}-${id}`);
    this._addItemToRoot(leafItem.id);
    this.items[leafItem.id] = leafItem;
    return this;
  }

  withSubTree(tree) {
    const subTree = tree.build();
    this._addItemToRoot(`${this.rootId}-${subTree.rootId}`);

    Object.keys(subTree.items).forEach(itemId => {
      const finalId = `${this.rootId}-${itemId}`;
      this.items[finalId] = {
        ...subTree.items[itemId],
        id: finalId,
        children: subTree.items[itemId].children.map(
          i => `${this.rootId}-${i}`,
        ),
      };
    });

    return this;
  }

  build() {
    return {
      rootId: this.rootId,
      items: this.items,
    };
  }

  _addItemToRoot(id) {
    const rootItem = this.items[this.rootId];
    rootItem.children.push(id);
    rootItem.isExpanded = true;
    rootItem.hasChildren = true;
  }

  _createItem = (id) => {
    return {
      id: `${id}`,
      children: [],
      hasChildren: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: `Title ${id}`,
      },
    };
  };
}


export const complexTree = new TreeBuilder(1)
  .withLeaf(0) // 0
  .withLeaf(1) // 1
  .withSubTree(
    new TreeBuilder(2) // 2
      .withLeaf(0) // 3
      .withLeaf(1) // 4
      .withLeaf(2) // 5
      .withLeaf(3), // 6
  )
  .withLeaf(3) // 7
  .withLeaf(4) // 8
  .withLeaf(5) // 9
  .withSubTree(
    new TreeBuilder(6) // 10
      .withLeaf(0) // 11
      .withLeaf(1) // 12
      .withSubTree(
        new TreeBuilder(2) // 13
          .withLeaf(0) // 14
          .withLeaf(1) // 15
          .withLeaf(2), // 16
      )
      .withLeaf(3) // 17
      .withLeaf(4), // 18
  )
  .withLeaf(7) // 19
  .withLeaf(8) // 20
  .build();


export const lists = {
  slots: {
    name: 'Slots',
    items: {
      firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      age: {
        name: 'age',
        label: 'Age',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      title: {
        name: 'title',
        label: 'Title',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      }
    },
    toggled: true
  },
  cards: {
    name: 'Cards',
    toggled: false,
    items: {
      firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      age: {
        name: 'age',
        label: 'Age',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      title: {
        name: 'title',
        label: 'Title',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      }
    }
  },
  actions: {
    toggled: false,
    name: 'Actions',
    items: {
      firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      age: {
        name: 'age',
        label: 'Age',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      title: {
        name: 'title',
        label: 'Title',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      }
    }
  },
  apis: {
    name: 'Apis',
    toggled: false,
    items: {
      firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      age: {
        name: 'age',
        label: 'Age',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      title: {
        name: 'title',
        label: 'Title',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      }
    }
  },

  flows: {
    name: 'Flows',
    toggled: false,
    items: {
      firstName: {
        name: 'firstName',
        label: 'First Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      lastName: {
        name: 'lastName',
        label: 'Last Name',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      age: {
        name: 'age',
        label: 'Age',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      title: {
        name: 'title',
        label: 'Title',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      },
      phone: {
        name: 'phone',
        label: 'Phone',
        type: 'PromptText',
        prompt: 'Please enter first Name'
      }
    }
  }
}


