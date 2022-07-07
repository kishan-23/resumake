
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
    e.stopPropagation();
    add_template_options();
});

function add_template_options(){
    let html = 
    `<div class="d-flex">
        <label>
            <input type="radio" name="resume_format" value="simple" checked>
            <img src="/Images/simple_resume.png" height="400px">
        </label>
        
        <label style="margin-left: 10px;">
            <input type="radio" name="resume_format" value="two_column">
            <img src="/Images/two_col_resume.png" height="400px">
        </label>
        
    </div>
    <input type="submit" class="btn btn-secondary" style="align-self: center;" value="Continue">
    `
    let elem = document.createElement('div');
    elem.className = 'd-flex flex-column';
    elem.id = 'template-form';
    elem.innerHTML = html;
    elem.style = 'align-items:center; justify-contents:space-around;'
    document.getElementById('template-options').appendChild(elem);

    document.querySelector('#template-options').scrollIntoView({
        behavior: 'smooth'
    });

    document.querySelector('#proceedBtn').addEventListener('click',(event)=>{
        event.preventDefault();
    });
       
}