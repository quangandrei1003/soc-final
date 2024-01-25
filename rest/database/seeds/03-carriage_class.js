/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const tableName = 'carriage_class';
const classTypes = {
  A: `A`,
  B: `B`
};

const classesArr = [
  {
    className: classTypes.A,
    classDescription: `First tier class`,
    seatingCapacity: 50
  },
  {
    className: classTypes.B,
    classDescription: `Second tier class`,
    seatingCapacity: 200
  },


];

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  const classes = classesArr
    .map((classItem, index) => ({
      id: index,
      class_name: classItem.className,
      class_description: classItem.classDescription,
      seating_capacity: classItem.seatingCapacity
    }));

  await knex(tableName).insert(classes.map(classItem => ({ ...classItem })));
};
