// Array-based queue implementation
/* *** ODSATag: AQueue1 *** */
class AQueue implements Queue {
  private static final int defaultSize = 10;
  private int maxSize;         // Maximum size of queue
  private int front;           // Index of front element
  private int rear;            // Index of rear element
  private Object queueArray[]; // Array holding queue elements

  // Constructors
  AQueue(int size) {
    maxSize = size+1;          // One extra space is allocated
    rear = 0; front = 1;
    queueArray = new Object[maxSize];  // Create queueArray
  }
  AQueue() { this(defaultSize); }
/* *** ODSAendTag: AQueue1 *** */

  String toString() {
    StringBuffer out = new StringBuffer(length() * 4);
    for (int i=front; i != (rear+1)%maxSize; i++) {
      i = i % maxSize;                 // Adjust for wrap-around
      out.append(queueArray[i]);
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: AQueue2 *** */

  // Reinitialize
  void clear() { rear = 0; front = 1; }

  // Put "it" in queue
  boolean enqueue(Object it) {
    if (((rear+2) % maxSize) == front) return false;  // Full
    rear = (rear+1) % maxSize; // Circular increment
    queueArray[rear] = it;
    return true;
  }

  // Remove and return front value
  Object dequeue() {
    if(length() == 0) return null;
    Object it = queueArray[front];
    front = (front+1) % maxSize; // Circular increment
    return it;
  }

  // Return front value
  Object frontValue() {
    if (length() == 0) return null;
    return queueArray[front];
  }

  // Return queue size
  int length() { return ((rear+maxSize) - front + 1) % maxSize; }
}
/* *** ODSAendTag: AQueue2 *** */
