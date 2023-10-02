const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  const findedContact = JSON.parse(allContacts).find((item) => item.id === contactId);
  return findedContact || null;
}

async function removeContact(contactId) {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  const allContactsArr = JSON.parse(allContacts);
  const findedContact = allContactsArr.findIndex((item) => item.id === contactId);
  if (findedContact === -1) return null;
  const removedContact = allContactsArr.splice(findedContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContactsArr, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  const allContactsArr = JSON.parse(allContacts);
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContactsArr, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
