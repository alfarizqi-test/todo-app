import './style.css'

// ===== ROOT APP =====
const app = document.getElementById('app')

app.innerHTML = `
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
    <div class="min-w-[90%] bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl 
                border border-slate-700/50 p-8 max-w-md w-full">
      
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-black bg-gradient-to-r from-indigo-400 
                    via-purple-400 to-pink-400 bg-clip-text text-transparent 
                    tracking-tight mb-2">
          📝 Todo List
        </h1>
        <p class="text-slate-400 text-sm">
          Modern · Responsive · Persistent
        </p>
      </div>

      <!-- Form Input -->
      <form id="todoForm" class="flex gap-3 mb-8">
        <input 
          id="todoInput" 
          type="text" 
          placeholder="💡 Apa yang akan dikerjakan hari ini?"
          autocomplete="off"
          class="flex-1 bg-slate-700/50 backdrop-blur-sm border border-slate-600 
                 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 
                 focus:ring-indigo-500/30 focus:border-indigo-500/50
                 text-xl placeholder-slate-400 transition-all duration-300
                 hover:border-slate-500/70"
        />
        <button 
          type="submit"
          class="group bg-gradient-to-r from-indigo-600 to-purple-600 
                 hover:from-indigo-500 hover:to-purple-500 
                 px-8 py-4 rounded-2xl font-bold text-xl shadow-xl 
                 hover:shadow-2xl active:scale-[0.98] transition-all 
                 duration-300 flex items-center gap-2 whitespace-nowrap">
          ➕ Tambah
        </button>
      </form>

      <!-- Todo List -->
      <div class="space-y-4 max-h-96 overflow-y-auto pr-2 -mr-2">
        <ul id="todoList" class="space-y-4"></ul>
      </div>

      <!-- Empty State -->
      <div id="emptyState" class="text-center py-16 text-slate-500">
        <div class="w-24 h-24 mx-auto mb-4 bg-slate-700/50 rounded-2xl 
                    flex items-center justify-center text-3xl">
          📭
        </div>
        <p class="text-xl font-medium mb-1">Belum ada todo</p>
        <p class="text-sm">Mulai tambahkan tugas pertama kamu!</p>
      </div>
    </div>
  </div>
`

// ===== DOM ELEMENTS =====
const form = document.getElementById('todoForm')
const input = document.getElementById('todoInput')
const list = document.getElementById('todoList')
const emptyState = document.getElementById('emptyState')

// ===== STATE =====
let todos = JSON.parse(localStorage.getItem('todos')) || []

// ===== UTILITIES =====
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function toggleEmptyState() {
  emptyState.classList.toggle('hidden', todos.length > 0)
}

// ===== RENDER =====
function renderTodos() {
  list.innerHTML = ''

  todos.forEach((todo, index) => {
    const li = document.createElement('li')

    li.className = `
      group flex items-center gap-4 p-5 rounded-2xl border
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      ${
        todo.done
          ? 'bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border-emerald-500/30'
          : 'bg-gradient-to-r from-slate-700/70 to-slate-600/50 border-slate-600/50 hover:border-slate-500/70'
      }
    `

    li.innerHTML = `
      <!-- Toggle -->
      <button 
        onclick="toggleTodo(${index})"
        class="flex-shrink-0 w-10 h-10 rounded-2xl border-2 transition-all 
               duration-300 flex items-center justify-center text-lg font-bold
               ${
                 todo.done
                   ? 'bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/25'
                   : 'border-slate-400/70 hover:border-indigo-400 hover:bg-indigo-500/20'
               } hover:scale-110 active:scale-95">
        ${todo.done ? '✅' : '○'}
      </button>

      <!-- Text -->
      <span 
        onclick="toggleTodo(${index})"
        class="flex-1 cursor-pointer transition-all duration-200 py-1
               ${
                 todo.done
                   ? 'line-through text-slate-400'
                   : 'text-white hover:text-indigo-300'
               }">
        ${todo.text}
      </span>

      <!-- Delete -->
      <button 
        onclick="deleteTodo(${index})"
        class="flex-shrink-0 text-red-400 hover:text-red-300 
               hover:bg-red-500/20 px-4 py-3 rounded-xl 
               transition-all duration-200 font-bold hover:scale-110 
               active:scale-95 group-hover:opacity-100 opacity-70">
        🗑️
      </button>
    `

    list.appendChild(li)
  })

  saveTodos()
  toggleEmptyState()
}

// ===== GLOBAL HANDLERS =====
window.toggleTodo = (index) => {
  todos[index].done = !todos[index].done
  renderTodos()
}

window.deleteTodo = (index) => {
  if (confirm(`Hapus "${todos[index].text}"?`)) {
    todos.splice(index, 1)
    renderTodos()
  }
}

// ===== FORM SUBMIT =====
form.addEventListener('submit', (e) => {
  e.preventDefault()

  const text = input.value.trim()
  if (!text) {
    input.focus()
    return
  }

  todos.push({ text, done: false })
  input.value = ''
  input.focus()
  renderTodos()
})

// ===== INIT =====
renderTodos()
