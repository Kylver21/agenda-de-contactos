import { useState } from 'react'
import { Contact } from '../types/Contact.tsx'

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, 'id'>) => void
  editingContact: Contact | null
  onUpdate: (contact: Contact) => void
  onCancelEdit: () => void
}

function ContactForm({ onSubmit, editingContact, onUpdate, onCancelEdit }: ContactFormProps) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !apellido.trim() || !email.trim || !telefono.trim) {
      alert('Por favor complete todos los campos')
      return
    }

    onSubmit({ nombre: nombre.trim(), apellido: apellido.trim(), email: email.trim(), telefono: telefono.trim() })
    setNombre('')
    setApellido('')
    setEmail('')
    setTelefono('')
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ingrese el nombre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Ingrese el apellido"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ingrese el email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="telefono">Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="Ingrese el teléfono"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">
          Agregar
        </button>
        {editingContact && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm