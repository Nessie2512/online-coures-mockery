

export class createStudent{

    constructor(
        private readonly studentRepository: any,
        private readonly enrollmentRepository: any
    ) {}

    async execute(studentData: any, courseId: string): Promise<void> {
        const student = await this.studentRepository.create(studentData);
}

}