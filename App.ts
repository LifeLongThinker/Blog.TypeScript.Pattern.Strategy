import { 
    Student, 
    Course, 
    CourseView, 
    LastNameAscendingSortingStrategy, 
    SatScoreDescendingSortingStrategy, 
    StudentNrAscendingSortingStrategy } from './EnrollmentManagement';

// create sample students and course view
const students: Array<Student> = [
    new Student(46279, "John",      "Doe",      13.8),
    new Student(12345, "Jane",      "Doe",      16.4),
    new Student(15623, "Alex",      "Sanchez",   9.5),
    new Student(98745, "Vanessa",   "Miller",   19.1)
];
const cs101 = new Course(101, "Computer Science 101", students);
const cs101View = new CourseView(cs101);

// print "unsorted" state
cs101View.printParticipants("UNSORTED");

// sort by last name, then print
cs101View.sortingStrategy = new LastNameAscendingSortingStrategy();
cs101View.printParticipants("SORTED BY LAST NAME ASCENDING");

// sort by SAT score, then print
cs101View.sortingStrategy = new SatScoreDescendingSortingStrategy();
cs101View.printParticipants("SORTED BY SAT SCORE DESCENDING");

// sort by nr, then print
cs101View.sortingStrategy = new StudentNrAscendingSortingStrategy();
cs101View.printParticipants("SORTED BY STUDENT NR ASCENDING");