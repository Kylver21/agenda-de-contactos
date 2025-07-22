import { useState, useEffect } from 'react'
import { Contact } from './types/Contact.tsx'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    }
    setContacts([...contacts, newContact])
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
  }

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    ))
    setEditingContact(null)
  }

  const filteredContacts = contacts.filter(contact => {
    const term = searchTerm.toLowerCase()
    return (
      contact.nombre.toLowerCase().includes(term) ||
      contact.apellido.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.telefono.toLowerCase().includes(term)
    )
  })

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>Agregar Contacto</h2>
          <ContactForm 
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancelEdit={() => setEditingContact(null)}
          />
        </section>

        <section className="contacts-section">
          <h2>Lista de Contactos</h2>
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ContactList 
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </section>
      </main>
    </div>
  )
}

export default App
