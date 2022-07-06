
function req_to_obj(body){
    let obj = {
        name : body.uname,
        bio : body.ubio,
        place : body.uplace,
        dob : body.udob,
        phone : body.uphone,
        email: body.umail,
        resume_format: body.resume_format,
        has_project: false,
        has_experience: false
    }

    obj.portfolio = [];
    if('uportTitle' in body){
        if(Array.isArray(body.uportTitle)){
            for(let i=0;i<body.uportTitle.length;i++){
                let profile = {
                    title: body.uportTitle[i],
                    link: body.uportLink[i]
                }
                obj.portfolio.push(profile);
            }
        }else{
            let profile = {
                title: body.uportTitle,
                link: body.uportLink
            }
            obj.portfolio.push(profile);
        } 
    }

    obj.skills = [];
    for(let i=0;i<body.uskillCat.length;i++){
        let skill = {
            category: body.uskillCat[i],
            skill_set: body.uskillSet[i]
        }
        obj.skills.push(skill);
    }

    obj.education = [];
    if(Array.isArray(body.ucollege)){
            for(let i=0;i<body.ucollege.length;i++){
            let edu = {
                college: body.ucollege[i],
                degree: body.udegree[i],
                major: body.umajor[i],
                score: body.uscore[i],
                start: body.ueduStart[i],
                end: body.ueduEnd[i]
            }

            obj.education.push(edu);
        }
    }else{
        let edu = {
            college: body.ucollege,
            degree: body.udegree,
            major: body.umajor,
            score: body.uscore,
            start: body.ueduStart,
            end: body.ueduEnd,      
        }

        obj.education.push(edu);
    }
    

    obj.projects = [];
    if('uprojectTitle' in body){
        obj.has_project = true;
        if(Array.isArray(body.uprojectTitle)){
            for(let i=0;i<body.uprojectTitle.length;i++){
                let project = {
                    title: body.uprojectTitle[i],
                    tech_stack: body.uprojectTech[i],
                    start: body.uprojectStart[i],
                    end: body.uprojectEnd[i],
                    details: body.uprojectDetails[i]
                }
                obj.projects.push(project);
            }
        }else{
            let project = {
                title: body.uprojectTitle,
                tech_stack: body.uprojectTech,
                start: body.uprojectStart,
                end: body.uprojectEnd,
                details: body.uprojectDetails
            }
            obj.projects.push(project);
        }
        
    }

    obj.experience = [];
    if('ucompany' in body){
        obj.has_experience = true;
        if(Array.isArray(body.ucompany)){
            for(let i=0;i<body.ucompany.length;i++){
                let work = {
                    company: body.ucomapny[i],
                    role: body.ucomRole[i],
                    start: body.ucomStart[i],
                    end: body.ucomEnd[i],
                    details: body.ucomDetails[i]
                }
                obj.experience.push(work);
            }
        }else{
            let work = {
                company: body.ucomapny,
                role: body.ucomRole,
                start: body.ucomStart,
                end: body.ucomEnd,
                details: body.ucomDetails
            }
            obj.experience.push(work);
        }
        
    }

    return obj;
}

module.exports = req_to_obj;