 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
        import { getFirestore, collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot } 
            from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBQE2k5okbmOWChl0IV5hbQxvDdP0tV5B4",
            authDomain: "todo-86428.firebaseapp.com",
            projectId: "todo-86428",
            storageBucket: "todo-86428.appspot.com", 
            messagingSenderId: "998777510251",
            appId: "1:998777510251:web:604a33d482b080b0f2942e",
            measurementId: "G-Z4XW79WYWB"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // CREATE
        window.addItem = async function () {
            const value = document.getElementById('itemInput').value;
            if (value.trim() !== '') {
                await addDoc(collection(db, 'items'), { name: value });
                document.getElementById('itemInput').value = '';
            }
        }

        // UPDATE
        async function updateItem(id, oldValue) {
            const newValue = prompt("Edit item:", oldValue);
            if (newValue && newValue.trim() !== '') {
                await updateDoc(doc(db, 'items', id), { name: newValue });
            }
        }

        // DELETE
        function deleteItem(id) {
            deleteDoc(doc(db, 'items', id));
        }

        // READ (Live updates)
        onSnapshot(collection(db, 'items'), (snapshot) => {
            const list = document.getElementById('itemList');
            list.innerHTML = '';
            snapshot.forEach((docSnap) => {
                const li = document.createElement('li');
                li.textContent = docSnap.data().name;

                const btnGroup = document.createElement('div');
                btnGroup.classList.add('btn-group');

                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.classList.add('update-btn');
                updateBtn.onclick = () => updateItem(docSnap.id, docSnap.data().name);

                const delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.classList.add('delete-btn');
                delBtn.onclick = () => deleteItem(docSnap.id);

                btnGroup.appendChild(updateBtn);
                btnGroup.appendChild(delBtn);
                li.appendChild(btnGroup);

                list.appendChild(li);
            });
        });