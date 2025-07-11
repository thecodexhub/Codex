import { 
  Grid3x3, 
  List, 
  Binary, 
  Zap, 
  Network, 
  Database, 
  Hash, 
  Shuffle 
} from 'lucide-react';

export const dsaTopics = [
  {
    id: 'arrays',
    name: 'Arrays & Strings',
    description: 'Master the fundamentals of arrays and string manipulation',
    icon: Grid3x3,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    subtopics: [
      {
        name: 'Two Pointers',
        description: 'Efficient array traversal techniques',
        difficulty: 'Easy',
        problems: 25,
        status: 'completed'
      },
      {
        name: 'Sliding Window',
        description: 'Optimize subarray/substring problems',
        difficulty: 'Medium',
        problems: 20,
        status: 'completed'
      },
      {
        name: 'Prefix Sum',
        description: 'Range query optimization',
        difficulty: 'Medium',
        problems: 15,
        status: 'in-progress'
      },
      {
        name: 'String Matching',
        description: 'Pattern matching algorithms',
        difficulty: 'Hard',
        problems: 18,
        status: 'not-started'
      }
    ]
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    description: 'Dynamic data structures and pointer manipulation',
    icon: List,
    color: 'bg-gradient-to-r from-green-500 to-teal-500',
    subtopics: [
      {
        name: 'Singly Linked List',
        description: 'Basic operations and traversal',
        difficulty: 'Easy',
        problems: 15,
        status: 'completed'
      },
      {
        name: 'Doubly Linked List',
        description: 'Bidirectional traversal',
        difficulty: 'Medium',
        problems: 12,
        status: 'in-progress'
      },
      {
        name: 'Fast & Slow Pointers',
        description: 'Cycle detection and middle element',
        difficulty: 'Medium',
        problems: 18,
        status: 'not-started'
      },
      {
        name: 'Reverse Operations',
        description: 'Reversing linked lists',
        difficulty: 'Hard',
        problems: 10,
        status: 'not-started'
      }
    ]
  },
  {
    id: 'trees',
    name: 'Trees & Binary Trees',
    description: 'Hierarchical data structures',
    icon: Binary,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    subtopics: [
      {
        name: 'Binary Tree Traversal',
        description: 'In-order, pre-order, post-order',
        difficulty: 'Easy',
        problems: 20,
        status: 'completed'
      },
      {
        name: 'Binary Search Tree',
        description: 'Search, insert, delete operations',
        difficulty: 'Medium',
        problems: 25,
        status: 'in-progress'
      },
      {
        name: 'Tree Construction',
        description: 'Build trees from arrays',
        difficulty: 'Hard',
        problems: 15,
        status: 'not-started'
      },
      {
        name: 'Tree DP',
        description: 'Dynamic programming on trees',
        difficulty: 'Hard',
        problems: 12,
        status: 'locked'
      }
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    description: 'Optimization through memoization',
    icon: Zap,
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    subtopics: [
      {
        name: '1D DP',
        description: 'Linear dynamic programming',
        difficulty: 'Medium',
        problems: 30,
        status: 'not-started'
      },
      {
        name: '2D DP',
        description: 'Grid-based problems',
        difficulty: 'Hard',
        problems: 25,
        status: 'not-started'
      },
      {
        name: 'Knapsack',
        description: '0/1 and unbounded knapsack',
        difficulty: 'Hard',
        problems: 20,
        status: 'locked'
      },
      {
        name: 'Tree DP',
        description: 'DP on trees',
        difficulty: 'Hard',
        problems: 15,
        status: 'locked'
      }
    ]
  },
  {
    id: 'graphs',
    name: 'Graphs',
    description: 'Network and relationship modeling',
    icon: Network,
    color: 'bg-gradient-to-r from-indigo-500 to-blue-500',
    subtopics: [
      {
        name: 'DFS & BFS',
        description: 'Graph traversal algorithms',
        difficulty: 'Medium',
        problems: 22,
        status: 'not-started'
      },
      {
        name: 'Shortest Path',
        description: 'Dijkstra, Floyd-Warshall',
        difficulty: 'Hard',
        problems: 18,
        status: 'not-started'
      },
      {
        name: 'Topological Sort',
        description: 'Dependency resolution',
        difficulty: 'Hard',
        problems: 15,
        status: 'locked'
      },
      {
        name: 'Union Find',
        description: 'Disjoint set operations',
        difficulty: 'Hard',
        problems: 12,
        status: 'locked'
      }
    ]
  },
  {
    id: 'heap',
    name: 'Heap & Priority Queue',
    description: 'Priority-based data structures',
    icon: Database,
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    subtopics: [
      {
        name: 'Min/Max Heap',
        description: 'Basic heap operations',
        difficulty: 'Medium',
        problems: 15,
        status: 'not-started'
      },
      {
        name: 'Top K Elements',
        description: 'Finding top K elements',
        difficulty: 'Medium',
        problems: 18,
        status: 'not-started'
      },
      {
        name: 'Merge K Lists',
        description: 'Merging sorted sequences',
        difficulty: 'Hard',
        problems: 10,
        status: 'locked'
      },
      {
        name: 'Median Stream',
        description: 'Running median calculation',
        difficulty: 'Hard',
        problems: 8,
        status: 'locked'
      }
    ]
  },
  {
    id: 'hashing',
    name: 'Hashing',
    description: 'Fast lookup and frequency counting',
    icon: Hash,
    color: 'bg-gradient-to-r from-teal-500 to-green-500',
    subtopics: [
      {
        name: 'Hash Tables',
        description: 'Basic hashing concepts',
        difficulty: 'Easy',
        problems: 20,
        status: 'not-started'
      },
      {
        name: 'Frequency Counting',
        description: 'Character and element frequency',
        difficulty: 'Easy',
        problems: 18,
        status: 'not-started'
      },
      {
        name: 'Hash Map Design',
        description: 'Custom hash map implementation',
        difficulty: 'Medium',
        problems: 12,
        status: 'locked'
      },
      {
        name: 'Rolling Hash',
        description: 'String hashing techniques',
        difficulty: 'Hard',
        problems: 10,
        status: 'locked'
      }
    ]
  },
  {
    id: 'sorting',
    name: 'Sorting & Searching',
    description: 'Fundamental algorithms',
    icon: Shuffle,
    color: 'bg-gradient-to-r from-pink-500 to-purple-500',
    subtopics: [
      {
        name: 'Binary Search',
        description: 'Search in sorted arrays',
        difficulty: 'Medium',
        problems: 25,
        status: 'not-started'
      },
      {
        name: 'Custom Sorting',
        description: 'Comparator-based sorting',
        difficulty: 'Medium',
        problems: 15,
        status: 'not-started'
      },
      {
        name: 'Quick Select',
        description: 'Kth element selection',
        difficulty: 'Hard',
        problems: 12,
        status: 'locked'
      },
      {
        name: 'Merge Sort',
        description: 'Divide and conquer sorting',
        difficulty: 'Hard',
        problems: 10,
        status: 'locked'
      }
    ]
  }
];