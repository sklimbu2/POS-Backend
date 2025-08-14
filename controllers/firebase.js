const {
    getFirestore, 
    doc, 
    setDoc, 
    getDocs, 
    collection, 
    query,
    deleteDoc,
    updateDoc
} = require('firebase/firestore')
const {initializeApp} = require('firebase/app')

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
}= process.env;

const firebaseConfig = {
    apiKey : FIREBASE_API_KEY,
    authDomain : FIREBASE_AUTH_DOMAIN,
    databaseURL : FIREBASE_DATABASE_URL,
    projectId : FIREBASE_PROJECT_ID,
    storageBucket : FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId : FIREBASE_APP_ID,
}

let app
let firestoreDb
let isInitialized = false;
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = () => {
        const months = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];
    return months[new Date().getMonth()];
    }
const initializeFirebaseApp = () => {
    if (isInitialized) return;

    try {
        app = initializeApp(firebaseConfig);
        firestoreDb = getFirestore(app);
        isInitialized = true;
        console.log('Firebase app initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
};
const uploadProcessedData = async (dataToUpload) => {
    const id = dataToUpload.id

    console.log(id)
    try {
        const document = doc(firestoreDb, "POS", currentYear, currentMonth(), id);
        await setDoc(document,dataToUpload, {merge: true});
        console.log('Data uploaded successfully');
        return true;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};
const getAllData = async() => {
    try{
        const collectionRef = collection(firestoreDb, "POS",currentYear, currentMonth());
        const finalData = []
        const q = query(collectionRef)
        const docSnap = await getDocs(q)
        docSnap.forEach((doc) => {
            finalData.push(doc.data())
        })
        return finalData
    }catch(err){
        console.log(err)
    }
}
const updateDocument = async (docId, updateData) => {
    const id = docId.id
  try {
    const docRef = doc(firestoreDb, "POS", id);
    await updateDoc(docRef, updateData);
    console.log("Document updated successfully");
    return true; // Optional: Return success status
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Re-throw to let the caller handle it
  }
}
const deleteDocument = async (docId) => {
  try {
    const docRef = doc(firestoreDb, "POS", currentYear, currentMonth(),docId.id)
    await deleteDoc(docRef)
    console.log("Document deleted");
    return true
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};
const uploadNewFood = async(foodData) => {
    try{
        const id = foodData.name
        const document = doc(firestoreDb,"FoodData", id)
        await setDoc(document, foodData)
        console.log('New food added')
    }catch(error){
        console.log('Error adding new food data to database....')
        throw error
    }
}
const Firebase_GetFoodData = async() =>{
    try{
        const collectionRef = collection(firestoreDb, "FoodData")
        const finalData = []
        const q= query(collectionRef)
        const docSnap = await getDocs(q)
        docSnap.forEach((doc)=>{
            finalData.push(doc.data())
        })
        return finalData
    }catch(error){
        console.log(error)
    }
}
const Firebase_DeleteMenuItem = async(ItemName) =>{
    try{
        const docRef = doc(firestoreDb, "FoodData", ItemName)
        if(await deleteDoc(docRef)){
            return true
        }
    }catch(error){
        console.log(error)
        return false
    }
}
const getFirebaseApp = () => {
    if (!isInitialized) initializeFirebaseApp();
    return app;
};
module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessedData,
    getAllData,
    updateDocument,
    deleteDocument,
    uploadNewFood,
    Firebase_GetFoodData,
    Firebase_DeleteMenuItem
}
