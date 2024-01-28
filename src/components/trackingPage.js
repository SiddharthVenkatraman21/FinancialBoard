// trackingPage.js
import React, { useState, useEffect } from 'react';
import { serverTimestamp, collection, addDoc, arrayUnion, doc, updateDoc } from "./firebase";
import { useUser } from '../UserContext';
import { db, query, where, getDocs } from './firebase';

function TrackingPage() {
    const onLoad = async () => {
        const { uid } = useUser();

        if (!uid) {
            console.log("User is not logged in");
            return;
        }
        const userId = uid;
    
        // finding documentID
        const collectionRef = collection(db,"users");
        const q = query(collectionRef,where("uid") == uid);

        const querySnapshot = await getDocs(q);
        const documentId = querySnapshot.docs[0].id;
    }


}
export default TrackingPage;