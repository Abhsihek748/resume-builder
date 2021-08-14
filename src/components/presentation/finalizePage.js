import React from "react";
import ResumePreview from './resumePreview'
import  jsPDF  from "jspdf";
import html2canvas from 'html2canvas';
import { useFirestore } from "react-redux-firebase";
import {connect} from 'react-redux';

   function Finalize(props) {
    let educationSection= props.educationSection
    let contactSection=props.contactSection
    let documentd=props.document;
    const firestore = useFirestore();
    const saveToDatabase= async()=>{

    let user  = await firestore.collection('users').doc(props.auth.uid).get();
    user  = user.data();
    let obj = {};
    if(user.resumeIds !== undefined){
     obj= {...user.resumeIds,document:documentd,contactSection:contactSection,educationSection:educationSection};
    }else{
     obj= {document:documentd,contactSection:contactSection,educationSection:educationSection};
    }

    let res = await firestore.collection('users').doc(props.auth.uid).update({
      resumeIds:obj,
    })
     
    }
     const downloadResume=()=> {
    
       const input = document.getElementById('resumePreview');
      console.log(document)
       html2canvas(input)
         .then((canvas) => {
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF("p", "mm", "a4");
           var width = pdf.internal.pageSize.getWidth();
           var height = pdf.internal.pageSize.getHeight();
           pdf.addImage(imgData, 'JPEG', 0, 0,width,height);
           // pdf.output('dataurlnewwindow');
           pdf.save("resume.pdf");
         }).catch(function(error){
           console.log(error)
         })
     }
    return (
      <div className="container full finalize-page" >
      <div className="funnel-section ">
          <div className="finalize-preview-card " id="resumePreview">
            <ResumePreview contactSection={contactSection} educationSection={educationSection} skinCd={props?.document?.skinCd}></ResumePreview>   
          </div>
          <div className="finalize-settings center">            

             
              <div className=" download-resume resume-options">
                <p className="no-margin"  >
                  Download Resume As PdF
                </p>
                    <a style={{cursor:'pointer'}}  onClick={downloadResume}  >download Resume</a>
             </div>
             <div className=" download-resume resume-options">
                <p className="no-margin"  >
                 Save to Database
                </p>
                    <a style={{cursor:'pointer'}}  onClick={saveToDatabase}  >Save to Database</a>
             </div>
    </div>
    </div>
    </div>
    )

    
}

const mapStateToProps =(state)=>{
  return{
  contactSection : state.contactSection,
  educationSection : state.educationSection,
  auth :state.firebase.auth,
  document : state.document,
} 
}


export default connect(mapStateToProps,null)(Finalize)
