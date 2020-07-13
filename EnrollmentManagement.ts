export class Course
{
    constructor(public readonly nr: number,
                public readonly name: string,
                public readonly participants: Student[]) {}
}

export class Student
{
    constructor(public readonly nr: number, 
                public readonly firstName: string, 
                public readonly lastName: string,
                public readonly satScore: number) {}
}

export class CourseView
{
    constructor(public readonly course: Course) {}

    public sortingStrategy: SortingStrategy;

    public printParticipants(title: string): void {
        console.log(`\n\n==== ${this.course.name.toUpperCase()} ====`);
        console.log(`==== ${title} ====`);
        console.log(`Nr\tFirst Name\tLast Name\tScore`);

        this.sortParticipantsBySelectedStrategy().forEach(p => {
            console.log(`${p.nr}\t${p.firstName}\t\t${p.lastName}\t\t${p.satScore}`);
        })
    }

    private sortParticipantsBySelectedStrategy(): Student[] {
        if(!this.sortingStrategy)
        {
            return this.course.participants;
        }

        return this.sortingStrategy.sort(this.course.participants);
    }
}

export enum ComparisonResult
{
    FirstBeforeSecond = -1,
    Equal = 0,
    SecondBeforeFirst = 1
}

export abstract class SortingStrategy {
    public sort (students: Array<Student>): Array<Student> {
        // create a copy of the student array
        // so as not to modify the existing array
        const copyOfStudents = students.slice(0);

        copyOfStudents.sort(this.compareStudents);
        return copyOfStudents;
    }
    
    protected abstract compareStudents(a: Student, b: Student): ComparisonResult;
}

export class LastNameAscendingSortingStrategy extends SortingStrategy {
    protected compareStudents(a: Student, b: Student): ComparisonResult {
        if(a.lastName < b.lastName)
        {
            return ComparisonResult.FirstBeforeSecond;
        }
        else if(a.lastName == b.lastName)
        { 
            return ComparisonResult.Equal; 
        }
        else
        {
            return ComparisonResult.SecondBeforeFirst;
        }
    }
}

export class SatScoreDescendingSortingStrategy extends SortingStrategy {
    protected compareStudents(a: Student, b: Student): ComparisonResult {
        if(a.satScore > b.satScore)
        {
            return ComparisonResult.FirstBeforeSecond;
        }
        else if(a.satScore == b.satScore)
        {
            return ComparisonResult.Equal; 
        }
        else
        {
            return ComparisonResult.SecondBeforeFirst;
        }
    }
}

export class StudentNrAscendingSortingStrategy extends SortingStrategy {
    protected compareStudents(a: Student, b: Student): ComparisonResult {
        if(a.nr < b.nr)
        {
            return ComparisonResult.FirstBeforeSecond;
        }
        else if(a.nr == b.nr)
        {
            return ComparisonResult.Equal; 
        }
        else
        {
            return ComparisonResult.SecondBeforeFirst;
        }
    }
}