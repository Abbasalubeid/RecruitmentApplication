/**
 * Represents a role within the organization.
 * A role is associated with one or more persons and defines their responsibilities or access level.
 */
export class Role {
	role_id: number;
	name: string;

	/**
	 * Constructs a new Role instance.
	 * @param role_id The unique identifier for the role.
	 * @param name The name of the role, describing its purpose or level within the organization.
	 */
	constructor(role_id: number, name: string) {
		this.role_id = role_id;
		this.name = name;
	}
}
