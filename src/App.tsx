
import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from 'reactfire'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import RootLayouts from './layouts/root-layouts'

const App = () => {

  const app = useFirebaseApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app)

  return (
    <div>
      <FirestoreProvider sdk={db}>
        <AuthProvider sdk={auth}>
          <StorageProvider sdk={storage}>
              <RootLayouts />
          </StorageProvider>
        </AuthProvider>
      </FirestoreProvider>
    </div>
    
  )
}

export default App








