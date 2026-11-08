import { Address } from "./address.vo";
import { Entity } from "./Entity";
import { Name } from "./name.vo";

type Sex = "M" | "F"; 

export type personProps ={
     name: Name;
     sex: Sex;
     birthDate: Date;
     isActive: boolean;
     address: Address;
     nationality:string
}

export abstract class person<TProps extends personProps = personProps> extends Entity<TProps> {

    constructor(props: TProps, id?: string) {
        // 1. Domain Invariants (Validation before initializing fields)
        if (!props.birthDate || props.birthDate > new Date()) {
            throw new Error('A person cannot be born in the future.');
        }

       const newAgeInMonths = person.calculateAgeInMonths(props.birthDate);
        if (newAgeInMonths < 18) {
        throw new Error('The corrected birth date results in an invalid age (must be at least 1 year and 6 months old).');
        }

        // 2. Initialize parent class
        super(props, id);
        if (!props.isActive) {
            this.deActivate();
        }

        // 3. Flatten and assign incoming props directly to fields
        props.name = props.name;
        props.sex = props.sex;
        props.birthDate = props.birthDate;
        props.isActive = props.isActive;
        props.address = props.address;
        props.nationality = props.nationality
    }

    // ─── GETTERS (Safe reading of protected fields) ───

    get getName(): Name { 
        return this.props.name; 
    }

    get getSex(): Sex { 
        return this.props.sex; 
    }

    get getBirthDate(): Date { 
        return this.props.birthDate; 
    }

    get getIsActive(): boolean { 
        return this.props.isActive; 
    }

    get getAddress(): Address { 
        return this.props.address; 
    }

       get getNationality(): string { 
        return this.props.nationality; 
    }

    get age(): number { 
        return person.calculateAge(this.props.birthDate); 
    }

    // ─── BUSINESS LOGIC & BEHAVIORS (Mutating fields directly) ───

    /**
     * Updates the name of the person.
     */
    public changeName(newName: Name): void {
        if (this.props.name.equals(newName)) {
            return; // Idempotency
        }
        
        if (this.props.isActive && this.age >= 18) {
            throw new Error('Active adult profiles cannot change their name without administrative approval.');
        }

        this.props.name = newName;
    }

    /**
     * Updates the residential address.
     */
    public relocateTo(newAddress: Address): void {
        if (this.props.address.equals(newAddress)) {
            return;
        }

        this.props.isActive;
        this.props.address = newAddress;
    }

    /**
     * Activates the profile.
     */
    public activate(): void {
        if (this.props.isActive) {
            throw new Error('The profile is already active.');
        }
        super.activate();
        this.props.isActive = true;
    }

    /**
     * Deactivates the profile.
     */
    public deactivate(): void {
        if (!this.props.isActive) {
            throw new Error('The profile is already inactive.');
        }
        
        super.deActivate();
        this.props.isActive = false;
    }

    /**
     * Changes the registered gender.
     */
    public changeSex(newSex: Sex): void {
        if (this.props.sex === newSex) return;

        this.props.isActive;
        this.props.sex = newSex;
    }

    /**
     * Modifies and corrects the birth date, enforcing age constraints.
     */
    public changeBirthDate(newBirthDate: Date): void {


        if (!newBirthDate || newBirthDate > new Date()) {
            throw new Error('Birth date cannot be in the future.');
        }

        const newAgeInMonths = person.calculateAgeInMonths(newBirthDate);
        if (newAgeInMonths < 18) {
        throw new Error('The corrected birth date results in an invalid age (must be at least 1 year and 6 months old).');
        }

        this.props.birthDate = newBirthDate;
    }

    // ─── INTERNAL HELPER METHODS ───

    /**
     * Guard method ensuring operations only execute on active profiles.
     */
    private ensureIsActive(): void {
        if (!this.getIsActive) {
            throw new Error('Operation not allowed: Person profile is currently inactive.');
        }
    }

    /**
     * Pure function to calculate current age uniformly.
     */
    public static calculateAge(birthDate: Date): number {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }



    public static calculateAgeInMonths(birthDate: Date): number {
    const today = new Date();
    
    // 1. Calcula a diferença base em meses considerando os anos
    let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months += today.getMonth() - birthDate.getMonth();

    // 2. Se o dia de hoje for menor que o dia de nascimento, 
    // significa que ainda não completou o mês atual. Subtraímos 1 mês.
    if (today.getDate() < birthDate.getDate()) {
        months--;
    }

    return months;
    }

}
