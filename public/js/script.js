
let portfolioCount = 0;
let educationCount = 0;
let skillsCount = 1;
let experienceCount = 0;
let projectCount = 0;
let customCount = 0;

document.getElementById('addPortfolioBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let elem = document.createElement('div');
    elem.className = 'mb-3';
    elem.innerHTML = `<div class="input-group">
                        <span class="input-group-text">Title</span>
                        <input type="text" class="form-control" id="portfolioTitleInput${portfolioCount}" name="uportTitle">
                        <span class="input-group-text">Link</span>
                        <input type="text" class="form-control" id="portfolioLinkInput${portfolioCount}" name="uportLink">
                    </div>`;
    portfolioCount++;

    e.target.parentElement.insertBefore(elem,e.target);
    // console.log(e.target.parentElement);
});

document.getElementById('addEducationBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let elem = document.createElement('div');
    elem.className = 'educationBlock';
    elem.innerHTML = 
    `<div class="mb-3">
        <label for="collegeInput" class="form-label">College/School</label>
        <input type="text" class="form-control" id="collegeInput" name="ucollege">
    </div>
    <div class="mb-3">
        <label for="degreeInput" class="form-label">Degree/Course</label>
        <input type="text" class="form-control" id="degreeInput" name="udegree">
    </div>
    <div class="mb-3">
        <label for="majorInput" class="form-label">Subject/Major</label>
        <input type="text" class="form-control" id="majorInput" name="umajor">
    </div>
    <div class="mb-3">
        <label for="scoreInput" class="form-label">Score/Achievement</label>
        <input type="text" class="form-control" id="scoreInput" name="uscore">
    </div>
    <div class="mb-3">
        <div class="input-group">
            <span class="input-group-text">From Year</span>
            <input type="month" class="form-control" id="startMonthInput" name="ueduStart">
            <span class="input-group-text">To Year</span>
            <input type="month" class="form-control" id="endMonthInput" name="ueduEnd">
        </div>
    </div>`;
    educationCount++;

    e.target.parentElement.insertBefore(elem,e.target);
    // console.log(e.target.parentElement);
});

document.getElementById('addSkillsBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let elem = document.createElement('div');
    elem.className = 'skillsBlock';

    elem.innerHTML = 
    `<div class="input-group mb-3">
        <span class="input-group-text">Category</span>
        <input type="text" class="form-control" id="skillsCategoryInput" name="uskillCat">
    </div>
    <div class="input-group mb-3">
        <span class="input-group-text">Skill set</span>
        <input type="text" class="form-control" id="skillSetInput name="uskillSet"" aria-label="Comma seperated">
    </div>`;
    skillsCount++;

    e.target.parentElement.insertBefore(elem,e.target);
    // console.log(e.target.parentElement);
});

document.getElementById('addExperienceBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let elem = document.createElement('div');
    elem.className = 'experienceBlock';
    
    elem.innerHTML = 
    `<div class="mb-3">
            <label for="companyInput" class="form-label">Company/Organization</label>
            <input type="text" class="form-control" id="companyInput" name="ucompany">
        </div>
        <div class="mb-3">
            <label for="roleInput" class="form-label">Position/Role</label>
            <input type="text" class="form-control" id="roleInput" name="ucomRole">
        </div>
        <div class="mb-3">
            <div class="input-group">
                <span class="input-group-text">From Year</span>
                <input type="month" class="form-control" id="startExpInput" name="ucomStart">
                <span class="input-group-text">To Year</span>
                <input type="month" class="form-control" id="endExpInput" name="ucomEnd">
            </div>
        </div>
        <div class="mb-3">
            <label for="detailsExpInput" class="form-label">Details</label>
            <input class="form-control" id="detailsExpInput" name="ucomDetails" rows="2">
        </div>`;

    let rmbtn = document.createElement('button');
    rmbtn.className = 'btn btn-danger btn-sm';
    rmbtn.innerText = 'Remove';
    rmbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    });
    
    elem.appendChild(rmbtn);

    let targetSibling = e.target.parentElement.previousElementSibling;
    if(experienceCount==0){
        let elem1=document.createElement('div');
        elem1.className = 'formBlock col';
        elem1.id = 'experienceSection';
        let head = document.createElement('h4');
        head.innerText='Work Experience Block';
        elem1.appendChild(head);
        elem1.appendChild(elem);
        targetSibling.appendChild(elem1);
    }

    else{
        document.getElementById('experienceSection').appendChild(elem);
    }
    experienceCount++;
});

document.getElementById('addProjectBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let elem = document.createElement('div');
    elem.className = 'projectBlock';
    
    elem.innerHTML = 
    `<div class="mb-3">
            <label for="projectTitleInput" class="form-label">Title of Project</label>
            <input type="text" class="form-control" id="projectTiltleInput" name="uprojectTitle">
        </div>
        <div class="mb-3">
            <label for="techInput" class="form-label">Tech Stack</label>
            <input type="text" class="form-control" id="techInput" name="uprojectTech">
        </div>
        <div class="mb-3">
            <div class="input-group">
                <span class="input-group-text">From Year</span>
                <input type="month" class="form-control" id="startProjInput" name="uprojectStart">
                <span class="input-group-text">To Year</span>
                <input type="month" class="form-control" id="endProjInput" name="uprojectEnd">
            </div>
        </div>
        <div class="mb-3">
            <label for="detailsProjInput" class="form-label">Details</label>
            <input class="form-control" id="detailsProjInput" name="uprojectDetails" rows="2">
        </div>`;

    let rmbtn = document.createElement('button');
    rmbtn.className = 'btn btn-danger btn-sm';
    rmbtn.innerText = 'Remove';
    rmbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    });
    
    elem.appendChild(rmbtn);

    let targetSibling = e.target.parentElement.previousElementSibling;
    if(projectCount==0){
        let elem1=document.createElement('div');
        elem1.className = 'formBlock col';
        elem1.id = 'projectSection';
        let head = document.createElement('h4');
        head.innerText='Project Block';
        elem1.appendChild(head);
        elem1.appendChild(elem);
        targetSibling.appendChild(elem1);
    }

    else{
        document.getElementById('projectSection').appendChild(elem);
    }
    projectCount++;
});





document.getElementById('submitBtn').addEventListener('click',(e)=>{
    e.preventDefault();
    let resume_obj = form_data_to_obj();
    console.log(resume_obj);
});

function form_data_to_obj(){
    let formData = new FormData(document.getElementById('detailsForm'));
    // const values = [...formData.entries()];
    // console.log(values);

    let resume_obj = {};

    //Personal Block
    let personalObj = {};
    personalObj.name = formData.get('uname');
    personalObj.place = formData.get('uplace');
    personalObj.dob = formData.get('udob');
    resume_obj.personal_details = personalObj;
    console.log(personalObj);

    //Contact Block
    let contactObj = {};
    contactObj.phone = formData.get('uphone');
    contactObj.email = formData.get('umail');
    contactObj.linkedin = formData.get('ulinkedin');
    if(formData.has('uportTitle')){
        contactObj.portfolioTitle = formData.getAll('uportTitle');
        contactObj.portfolioLink = formData.getAll('uportLink');
    }
    resume_obj.contact = contactObj;
    console.log(contactObj);

    //Education Block
    let educationObj = {};
    educationObj.college = formData.getAll('ucollege');
    educationObj.degree = formData.getAll('udegree');
    educationObj.major = formData.getAll('umajor');
    educationObj.score = formData.getAll('uscore');
    educationObj.start_year = formData.getAll('ueduStart');
    educationObj.end_year = formData.getAll('ueduEnd');
    resume_obj.education = educationObj;
    console.log(educationObj);

    //Skills Block
    let skillsObj = {};
    skillsObj.category = formData.getAll('uskillCat');
    skillsObj.skill_set = formData.getAll('uskillSet');
    resume_obj.skills = skillsObj;
    console.log(skillsObj);

    //Experience Block
    if(formData.has('ucompany')){
        let expObj = {};
        expObj.company = formData.getAll('ucompany');
        expObj.role = formData.getAll('ucomRole');
        expObj.start_year = formData.getAll('ucomStart');
        expObj.end_year = formData.getAll('ucomEnd');
        expObj.details = formData.getAll('ucomDetails');
        resume_obj.experience = expObj;
        console.log(expObj);
    }

    //Projects Block
    if(formData.has('uprojectTitle')){
        let projectObj = {};
        projectObj.title= formData.getAll('uprojectTitle');
        projectObj.tech_stack = formData.getAll('uprojectTech');
        projectObj.start_year = formData.getAll('uprojectStart');
        projectObj.end_year = formData.getAll('uprojectEnd');
        projectObj.details = formData.getAll('uprojectDetails');
        resume_obj.project = projectObj;
        console.log(projectObj);
    }

    return resume_obj;
}