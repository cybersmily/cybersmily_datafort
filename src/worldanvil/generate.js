module.exports.generateWorldAnvilSheet = (param) => {
  var fs = require('fs');
  var coolSkills = [
  {name:"Interrogation"       , ipmod:1, stat:"COOL", description:"source CP2020 pg.47" },
  {name:"Intimidate"          , ipmod:1, stat:"COOL", description:"source CP2020 pg.47" },
  {name:"Oratory"             , ipmod:1, stat:"COOL", description:"source CP2020 pg.47" },
  {name:"Resist Torture/Drugs", ipmod:1, stat:"COOL", description:"source CP2020 pg.47" },
  {name:"Rhetoric"            , ipmod:1, stat:"COOL", description:"source Pacific Rim pg.153" },
  {name:"Streetwise"          , ipmod:1, stat:"COOL", description:"source CP2020 pg.48" }
  ]
  var bodySkills = [
    {name:"Endurance"    , ipmod:1, stat:"BODY", description:" source CP2020 pg.47" },
    {name:"Strength Feat", ipmod:1, stat:"BODY", description:" source CP2020 pg.47" },
    {name:"Swimming"     , ipmod:1, stat:"BODY", description:" source CP2020 pg.47" }
  ]
  var empSkills = [
    {name:"Animal Handler"        , ipmod:1, stat:"EMP", description:"source Solo of Fortune pg.26" },
    {name:"Human Perception"      , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Interview"             , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Leadership"            , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Perform"               , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Persuasion & Fast Talk", ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Seduction"             , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Simper"                , ipmod:1, stat:"EMP", description:"source LIve and Direct pg.53" },
    {name:"Social"                , ipmod:1, stat:"EMP", description:"source CP2020 pg.48" },
    {name:"Trance"                , ipmod:1, stat:"EMP", description:"source Neotribes pg.42" }
  ]
  var refSkills = [
    {name:"Action Game"                 , ipmod:1, stat:"REF", description:"source Pacific Rim pg.153" },
    {name:"Archery"                     , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Athletics"                   , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Brawling"                    , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Dance"                       , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Dodge/Escape"                , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Driving"                     , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"EVA"                         , ipmod:1, stat:"REF", description:"source Deep Space pg.76" },
    {name:"Fencing"                     , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Handgun"                     , ipmod:1, stat:"REF", description:"source CP2020 pg.50" },
    {name:"Heavy Weapon"                , ipmod:1, stat:"REF", description:"source CP2020 pg.51" },
    {name:"Melee"                       , ipmod:1, stat:"REF", description:"source CP2020 pg.51" },
    {name:"Motorcycle"                  , ipmod:1, stat:"REF", description:"source CP2020 pg.51" },
    {name:"Operate Hvy. Machinery"      , ipmod:1, stat:"REF", description:"source CP2020 pg.51" },
    {name:"Pilot: Deep Dive Suit"       , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.24" },
    {name:"Pilot: Dirigible"            , ipmod:2, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Pilot: EVPA"                 , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.24" },
    {name:"Pilot: Fixed Wing"           , ipmod:2, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Pilot: Gyro"                 , ipmod:3, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Pilot: Hardshell"            , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.24" },
    {name:"Pilot: Hovercraft"           , ipmod:2, stat:"REF", description:"source Firestorm: Shockwave pg.27" },
    {name:"Pilot: Large Submersible"    , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.25" },
    {name:"Pilot: Naval Ship"           , ipmod:2, stat:"REF", description:"source Pacific Rim pg.153" },
    {name:"Pilot: OTV"                  , ipmod:2, stat:"REF", description:"source Deep Space pg.76" },
    {name:"Pilot: PA"                   , ipmod:2, stat:"REF", description:"source Firestorm: Shockwave pg.29" },
    {name:"Pilot: Small Submersible"    , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.25" },
    {name:"Pilot: Spaceplane/Shuttle"   , ipmod:3, stat:"REF", description:"source Deep Space pg.76" },
    {name:"Pilot: Vect. Thrust Vehicle" , ipmod:3, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Remote System Operation"     , ipmod:2, stat:"REF", description:"source Protect and Serve pg.13" },
    {name:"Rifle"                       , ipmod:1, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Stealth"                     , ipmod:2, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Submachinegun"               , ipmod:1, stat:"REF", description:"source CP2020 pg.52" },
    {name:"Underwater Combat"           , ipmod:2, stat:"REF", description:"source Solo of Fortune pg.24" },
    {name:"Underwater Heavy Weapon"     , ipmod:1, stat:"REF", description:"source Solo of Fortune pg.25" },
    {name:"Underwater Weapons"          , ipmod:1, stat:"REF", description:"source Solo of Fortune pg.23" },
    {name:"Zero-G Combat"               , ipmod:2, stat:"REF", description:"source Deep Space pg.76" },
    {name:"Zero-G Maneuver"             , ipmod:1, stat:"REF", description:"source Deep Space pg.76" }
  ]

  var attrSkills = [
    {name:"Personal Grooming", ipmod:1, stat:"ATTR" ,description:"source CP2020 pg.47" },
    {name:"Wardrobe & Style" , ipmod:1, stat:"ATTR" ,description:"source CP2020 pg.47" }
  ]
  var techSkills = [
    {name:"Aero Tech"            , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"AV Tech"              , ipmod:3, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Basic Tech"           , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Bio Tech"             , ipmod:1, stat:"TECH" ,description: "source Wildside pg.21" },
    {name:"Braindance Editing"   , ipmod:1, stat:"TECH" ,description: "source Wildside pg.21" },
    {name:"Calligraphy"          , ipmod:1, stat:"TECH" ,description: "source Pacific Rim pg.153" },
    {name:"Cryotank Operation"   , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Cyberdeck Design"     , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Cyber Tech"           , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Demolitions"          , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Disguise"             , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.52" },
    {name:"Elect. Security"      , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Electronics"          , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"First Aid"            , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Forgery"              , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Gyro Tech"            , ipmod:3, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Operate Mining Equip.", ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.24" },
    {name:"Origami"              , ipmod:1, stat:"TECH" ,description: "source Pacific Rim pg.153" },
    {name:"PA Tech"              , ipmod:3, stat:"TECH" ,description: "source Firestorm: Shockwave pg.29" },
    {name:"Paint or Draw"        , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Pharmaceuticals"      , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Photo & Film"         , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Pick Lock"            , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Pick Pocket"          , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Play Instrument"      , ipmod:1, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Pressure Suit Tech"   , ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.25" },
    {name:"Sonar Tech"           , ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.25" },
    {name:"Sub Tech"             , ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.25" },
    {name:"Sub Tech(Large)"      , ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.25" },
    {name:"Sub Tech(Small)"      , ipmod:1, stat:"TECH" ,description: "source Solo of Fortune pg.25" },
    {name:"Tattooing"            , ipmod:1, stat:"TECH" ,description: "source Pacific Rim pg.153" },
    {name:"Weaponsmith"          , ipmod:2, stat:"TECH" ,description: "source CP2020 pg.53" },
    {name:"Wetware Design"       , ipmod:1, stat:"TECH" ,description: "source Wildside pg.21" }
  ]
  var intSkills = [
    {name:"Accounting"            , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Anthropology"          , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Astrogation"           , ipmod:1, stat:"INT", description: "source Deep Space" },
    {name:"Awareness/Notice"      , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Biology"               , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Biogenetics"           , ipmod:1, stat:"INT", description: "source Solo of Fortune pg.26" },
    {name:"Botany"                , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Bureaucracy"           , ipmod:1, stat:"INT", description: "source Wildside pg.23" },
    {name:"Business Sense"        , ipmod:1, stat:"INT", description: "source Wildside pg.25" },
    {name:"Chemistry"             , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Composition"           , ipmod:1, stat:"INT", description: "source CP2020 pg.48" },
    {name:"Corporate Policy"      , ipmod:1, stat:"INT", description: "source LIve and Direct pg.53" },
    {name:"Culture"               , ipmod:1, stat:"INT", description: "source LIve and Direct pg.53" },
    {name:"Diagnose Illness"      , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Education & Gen. Know.", ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Field Surgery"         , ipmod:1, stat:"INT", description: "source Neotribes pg.42" },
    {name:"Gamble"                , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Geology"               , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Hide/Evade"            , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"History"               , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Library Search"        , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Mathematics"           , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Nuscuba"               , ipmod:1, stat:"INT", description: "source Solo of Fortune pg.23" },
    {name:"Pharmacology"          , ipmod:1, stat:"INT", description: "source Wildside pg.24" },
    {name:"Physics"               , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Programming"           , ipmod:1, stat:"INT", description: "source CP2020 pg.49" },
    {name:"Psychology"            , ipmod:1, stat:"INT", description: "source Wildside pg.21" },
    {name:"Shadow/Track"          , ipmod:1, stat:"INT", description: "source CP2020 pg.50" },
    {name:"Space Survival"        , ipmod:1, stat:"INT", description: "source Deep Space pg.76" },
    {name:"Stock Market"          , ipmod:1, stat:"INT", description: "source CP2020 pg.50" },
    {name:"Street Survival"       , ipmod:1, stat:"INT", description: "source Pacific Rim pg.153" },
    {name:"System Knowledge"      , ipmod:1, stat:"INT", description: "source CP2020 pg.50" },
    {name:"Tactics"               , ipmod:1, stat:"INT", description: "source LIve and Direct pg.53" },
    {name:"Teaching"              , ipmod:1, stat:"INT", description: "source CP2020 pg.50" },
    {name:"Underwater Survival"   , ipmod:1, stat:"INT", description: "source Solo of Fortune pg.23" },
    {name:"Wilderness Survival"   , ipmod:1, stat:"INT", description: "source CP2020 pg.50" },
    {name:"Zoology"               , ipmod:1, stat:"INT", description: "source CP2020 pg.50" }
  ]



  const textField = (name, label, rows, spaces, description) => {
    let field = `${spaces}${name}:\n`;
    field += `${spaces}  input: text\n`;
    field += `${spaces}  label: "${label}"\n`;
    field += `${spaces}  rows: ${rows}\n`;
    if(description) {
      field += `${spaces}  description: "${description}"\n`;
    }
    return field
  }

  const numberField = (name, label, min, max, spaces, description) => {
    let field = `${spaces}${name}:\n`;
    field += `${spaces}  input: number\n`;
    field += `${spaces}  label: "${label}"\n`;
    field += `${spaces}  min: ${min}\n`;
    field += `${spaces}  max: ${max}\n`;
    if(description) {
      field += `${spaces}  description: "${description}"\n`;
    }
    return field
  }

  const selectField = (name, label, options, spaces, description) => {
    let field = `${spaces}${name}:\n`;
    field += `${spaces}  input: select\n`;
    field += `${spaces}  label: "${label}"\n`;
    field += `${spaces}  options:\n`;
    options.forEach( opt => {
      field += `${spaces}    ${opt}\n`;
    });
    if(description) {
      field += `${spaces}  description: "${description}"\n`;
    }
    return field
  }

  const checkboxField = (name, label, spaces, description) => {
    let field = `${spaces}${name}:\n`;
    field += `${spaces}  input: checkbox\n`;
    field += `${spaces}  label: "${label}"\n`;
    if(description) {
      field += `${spaces}  description: "${description}"\n`;
    }
    return field
  }

  const comment = (comment) => {
    return `### ${comment}\n`;
  }

  const getNumber = (num, precision) => {
    if (precision < 2 || precision > 3) {
      return num;
    }
    if (precision === 2 && num < 10) {
      return `0${num}`;
    } else if(precision === 3 && num < 10) {
      return `00${num}`;
    } else if(precision === 3 && num < 100) {
      return `0${num}`;
    }
    return num;
  }


  let result = 'fields:\n';
  // Handle *******************************************
  result += textField('handle', 'Handle', 1, '  ');
  result += textField(`aliases`, 'Aliases', 2, '  ');
  result += textField(`sin`, 'S.I.N.', 1, '  ');

  // Roles sections *******************************************
  result += comment('Roles');
  result += textField('primaryRole', 'Primary Role', 1, '  ');
  result += textField('primarySA_SkillName_01', 'Primary Special Ability', 1, '  ');
  result += numberField('primarySA_SkillValue_01', 'Primary Special Ability Value', 0, 10, '  ');
  result += numberField('primarySA_SkillIP_01', 'Primary Special Ability SpeicalIP', 0, 10, '  ');
  for (let i = 1; i < 4; i++) {
    const num = getNumber(i, 2);
    result += textField(`secondaryRole_${num}`, 'Secondary Role', 1, '  ');
    result += textField(`secondarySA_SkillName_${num}`, 'Secondary Special Ability Name', 1, '  ');
    result += numberField(`secondarySA_SkillValue_${num}`, 'Secondary Special Ability Value', 0, 10, '  ');
    result += numberField(`secondarySA_SkillIP_${num}`, 'Secondary Special Ability IP', 0, 10, '  ');
    }

  // Stats section *******************************************
  result += comment('Stats');
  result += numberField('statPoints', 'STAT PTS', 0, 200, '  ');
  result += numberField('intBase', 'INT', 0, 30, '  ');
  result += numberField('intCurr', 'INT Current', 0, 30, '  ');

  result += numberField('refBase', 'REF', 0, 30, '  ');
  result += numberField('refCurr', 'REF Current', 0, 30, '  ');

  result += numberField('techBase', 'TECH', 0, 15, '  ');
  result += numberField('techCurr', 'TECH Current', 0, 30, '  ');

  result += numberField('coolBase', 'COOL', 0, 15, '  ');
  result += numberField('coolCurr', 'COOL Current', 0, 30, '  ');

  result += numberField('attrBase', 'ATTR', 0, 15, '  ');
  result += numberField('attrCurr', 'ATTR Current', 0, 30, '  ');

  result += numberField('luckBase', 'LUCK', 0, 10, '  ');
  result += numberField('luckCurr', 'LUCK Current', 0, 30, '  ');

  result += numberField('maBase', 'MA', 0, 50, '  ');
  result += numberField('maCurr', 'MA Current', 0, 50, '  ');

  result += numberField('bodyBase', 'BODY', 0, 40, '  ');
  result += numberField('bodyCurr', 'BODY Current', 0, 40, '  ');

  result += numberField('empBase', 'EMP', 0, 15, '  ');
  result += numberField('empCurr', 'EMP Current', 0, 20, '  ');

  result += numberField('humanityBase', 'Humanity', 0, 15, '  ');
  result += numberField('humanityCurr', 'Humanity Current', 0, 20, '  ');

  result += numberField('deathSave', 'Death Save', 0, 40, '  ');
  result += numberField('stunSave', 'Stun Save', 0, 40, '  ');
  result += numberField('btm', 'BTM', -10, 0, '  ');
  result += numberField('bonusDamage', 'bonusDamage', -2, 20, '  ');
  result += numberField('run', 'Run', 0, 150, '  ');
  result += numberField('leap', 'Leap', 0, 40, '  ');
  result += numberField('lift', 'lift', 0, 2000, '  ');
  result += numberField('initiative', 'Initiative', 0, 50, '  ');
  result += numberField('rep', 'Reputation', 0, 15, '  ');
  result += numberField('wounds', 'Reputation', 0, 40, '  ');

  // Ethnicity section *******************************************
  result += comment('Ethnicity');
  result += textField('ethnicity', 'Ethnicity', 1, '  ');
  result += textField('ethnicityLang', 'Language', 1, '  ');
  // Motivation section *******************************************
  result += comment('Motivations');
  result += textField('personality', 'Personality', 1, '  ');
  result += textField('valuedPerson', 'Valued Person', 1, '  ');
  result += textField('valueMost', 'Value Most', 1, '  ');
  result += textField('feelAboutPeople', 'Feel About People', 1, '  ');
  result += textField('valuedPossession', 'Valued Possession', 1, '  ');
  // Appearance section *******************************************
  result += comment('Appearance');
  result += textField('clothes', 'Clothes', 1, '  ');
  result += textField('hairstyle', 'Hairstyle', 1, '  ');
  result += textField('affectations', 'Affectations', 1, '  ');
  // Family section *******************************************
  result += comment('Family');
  result += textField('familyRanking', 'Family Ranking', 1, '  ');
  result += textField('familyBackground', 'Family Background', 5, '  ');
  result += numberField('siblingsNumber', '#Siblings', 0, 8, '  ');
  for(let i = 1; i < 9; i++) {
    const num = getNumber(i, 2);
    result += textField(`siblingName${num}`, 'Name', 5, '  ');
    result += selectField(`siblingGender${num}`, 'Gender', ['sib: Sib', 'brother: Brother', 'sister: Sister'], '  ');
    result += selectField(`siblingFeeling${num}`, 'Feelings',
      ['neutral: Neutral', 'heroWorship: Hero Worship', 'likes: Likes', 'dislikes: Dislikes', 'hates: Hates']
      , '  ');
    result += selectField(`siblingAge${num}`, 'Age',
      ['older: Older', 'younger: Younger', 'twin: Twin']
      , '  ');
  }
  // Life Events section *******************************************
  result += comment('LifeEvents');
  result += numberField('age', 'Age', 0, 250, '  ');
  for(let i = 1; i < 31; i++) {
    const num = getNumber(i, 2);
    result += numberField(`lifeEventYear${num}`, 'Year', 1, 250, '  ');
    result += textField(`lifeEventDetail${num}`, 'Details', 5, '  ');
  }
  // Money section *******************************************
  result += comment('Money');
  result += numberField(`cash`, 'Cash', 0, 1000000000000, '  ');
  result += numberField(`debt`, 'Debt', 0, 1000000000000, '  ');
  result += numberField(`salary`, 'Salary', 0, 1000000000000, '  ');
  result += textField(`credchips`, 'Credchips', 2, '  ');
  // Living section *******************************************
  result += comment('Living and Expenses');
  result += selectField(`housingLocation`, 'Location',
    ['combatZone: Combat Zone', 'moderateZone: Moderate Zone', 'corporateZone: Corporate Zone', 'executiveZone: Executive Zone']
    , '  ');
  result += selectField(`housingType`, 'Housing Type',
    ['appt: Appartment', 'house: House']
    , '  ');
  result += numberField(`housingRooms`, 'Rooms', 0, 50, '  ');
  result += numberField(`housingRent`, 'Rent', 0, 10000000, '  ');
  result += textField(`utilities`, 'Utilities', 3, '  ');
  for(let i = 1; i < 6; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`serviceName${num}`, 'Service', 1, '  ');
    result += numberField(`serviceCost${num}`, 'Rent', 0, 10000000, '  ');
  }

  // skills section *******************************************
  result += comment('Skills');
  result += numberField(`generalIP`, `generalIP`, 0, 10000, '  ');
  var generateSkill = (skills, title ) => {
    for(const [index, skill] of skills.entries()) {
      var num = (((index + 1) < 10) ? `0` : '') + (index + 1);
      var name = skill.name + ( skill.ipmod > 1 ? `[${skill.ipmod}]`: '');
      result += numberField(`${title}_SkillValue_${num}`, `${name}`, 0, 10, '  ', skill.description);
      result += numberField(`${title}_SkillIP_${num}`, `${name} IP`, 0, 600, '  ', skill.description);
      result += checkboxField(`${title}_SkillChipped_${num}`, `${name} chipped`, '  ');
    }
  }
  generateSkill(attrSkills, 'ATTR');
  generateSkill(bodySkills, 'BODY');
  generateSkill(coolSkills, 'COOL');
  generateSkill(empSkills, 'EMP');
  generateSkill(intSkills, 'INT');
  // languague skills section *******************************************
  result += comment('Language skills');
  for(let i = 1; i < 6; i++) {
    let num =getNumber(i, 3) ;
    result += textField(`lang_SkillName_${num}`, `language Name`, 1, '  ');
    result += numberField(`lang_SkillValue_${num}`, `language Value`, 0, 10, '  ');
    result += numberField(`lang_SkillIP_${num}`, `language IP`, 0, 600, '  ');
    result += checkboxField(`lang_SkillChipped_${num}`, `language Chipped`, '  ');
  }
  // Expert skills section *******************************************
  result += comment('Expert skills');
  for(let i = 1; i < 5; i++) {
    let num =getNumber(i, 3) ;
    result += textField(`expert_SkillName_${num}`, `expert skill Name`, 1, '  ');
    result += numberField(`expert_SkillValue_${num}`, `expert skill Value`, 0, 10, '  ');
    result += numberField(`expert_SkillIP_${num}`, `expert skill IP`, 0, 600, '  ');
    result += checkboxField(`expert_SkillChipped_${num}`, `expert skill Chipped`, '  ');
  }
  generateSkill(refSkills, 'REF');
  generateSkill(techSkills, 'TECH');


  // Other skills section *******************************************
  result += comment('Other skills');
  for(let i = 1; i < 7; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`other_SkillName_${num}`, `Other Skill Name`, 1, '  ');
    result += numberField(`other_SkillValue_${num}`, `Other Skill Value`, 0, 10, '  ');
    result += numberField(`other_SkillIP_${num}`, `Other Skill IP`, 0, 600, '  ');
    result += checkboxField(`other_SkillChipped_${num}`, `Other Skill Is Chipped`, '  ');
  }

  // Martial Arts skills *******************************************
  result += comment('Martial Arts');
  for( let i = 1; i < 6; i++) {
    let num = getNumber(i, 2) ;
    result += textField(`ma${num}_Name`, `Martial Art Name`, 1, '  ');
    result += numberField(`ma${num}_SkillValue`, `MA Skill Value`, 0, 10, '  ');
    result += numberField(`ma${num}_SkillIP`, `MA Skill IP`, 0, 600, '  ');
    result += checkboxField(`ma${num}_SkillChipped`, `MA Skill Is Chipped`, '  ');
    result += numberField(`ma${num}_Strike`, `MA Strike`, 0, 5, '  ');
    result += numberField(`ma${num}_Punch`, `MA Punch`, 0, 5, '  ');
    result += numberField(`ma${num}_Kick`, `MA Kick`, 0, 5, '  ');
    result += numberField(`ma${num}_Disarm`, `MA Disarm`, 0, 5, '  ');
    result += numberField(`ma${num}_Sweep`, `MA Sweep`, 0, 5, '  ');
    result += numberField(`ma${num}_Block`, `MA Block`, 0, 5, '  ');
    result += numberField(`ma${num}_Dodge`, `MA Dodge`, 0, 5, '  ');
    result += numberField(`ma${num}_Grapple`, `MA Grapple`, 0, 5, '  ');
    result += numberField(`ma${num}_Throw`, `MA Throw`, 0, 5, '  ');
    result += numberField(`ma${num}_Hold`, `MA Hold`, 0, 5, '  ');
    result += numberField(`ma${num}_Choke`, `MA Choke`, 0, 5, '  ');
    result += numberField(`ma${num}_Escape`, `MA Escape`, 0, 5, '  ');
    result += numberField(`ma${num}_Ram`, `MA Ram`, 0, 5, '  ');
  }

  // Cyberware section *******************************************
  result += comment('Cyberware');
  result += numberField(`totalHL`, `totalHL`, 0, 200, '  ');
  for(let i = 1; i < 21; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`cyberName_${num}`, `cyberName${num}`, 1, '  ');
    result += numberField(`cyberHL_${num}`, `cyberHL${num}`, 0, 50, '  ');
    }
  // Weapons section *******************************************
  result += comment('Weapons');
  for(let i = 1; i < 11; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`weaponName_${num}`, 'Name', 1, '  ');
    result += textField(`weaponNote_${num}`, 'Notes', 3, '  ');
    result += selectField(`weaponType_${num}`, 'Type',
      [ 'p: P', 'rif: RIF', 'smg: SMG', 'sht: SHT', 'mel: MEL', 'ex: EX', 'hvy: HVY'], '  ');
    result += numberField(`weaponAcc_${num}`, 'WA', -15, 15, '  ');
    result += selectField(`weaponConc_${num}`, 'Conc',
      [ 'p: P', 'j: J', 'l: L', 'n: N'], '  ');
    result += textField(`weaponDmg_${num}`, 'Damage', 1, '  ');
    result += numberField(`weaponShots_${num}`, '#Shots', 0, 10000, '  ');
    result += numberField(`weaponRof_${num}`, 'RoF', 0, 10000, '  ');
    result += numberField(`weaponRng_${num}`, 'Range', 0, 10000, '  ');
    result += selectField(`weaponRel_${num}`, 'Rel',
    [ 'st: ST', 'ur: UR', 'vr: VR'], '  ');
    result += textField(`weaponMags_${num}`, 'Magazines', 3, '  ');
  }

  // Armor section *******************************************
  result += comment('Armor');
  result += numberField(`totalSPHead`, 'SP Head', 0, 50, '  ');
  result += numberField(`totalSPTorso`, 'SP Torso', 0, 50, '  ');
  result += numberField(`totalSPRArm`, 'SP R Arm', 0, 50, '  ');
  result += numberField(`totalSPLArm`, 'SP L Arm', 0, 50, '  ');
  result += numberField(`totalSPRLeg`, 'SP R Leg', 0, 50, '  ');
  result += numberField(`totalSPLLeg`, 'SP L Leg', 0, 50, '  ');
  result += numberField(`totalSPEV`, 'Total EV', 0, 50, '  ');
  result += numberField(`totalSDPHead`, 'SDP Head', 0, 50, '  ');
  result += numberField(`totalSDPTorso`, 'SDP Torso', 0, 50, '  ');
  result += numberField(`totalSDPRArm`, 'SDP R Arm', 0, 50, '  ');
  result += numberField(`totalSDPLArm`, 'SDP L Arm', 0, 50, '  ');
  result += numberField(`totalSDPRLeg`, 'SDP R Leg', 0, 50, '  ');
  result += numberField(`totalSDPLLeg`, 'SDP L Leg', 0, 50, '  ');
  for(let i = 1; i < 6; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`layer${num}_Name`, 'Layer', 1, '  ');
    result += numberField(`layer${num}_Head`, 'Head', 0, 50, '  ');
    result += numberField(`layer${num}_Torso`, 'Torso', 0, 50, '  ');
    result += numberField(`layer${num}_RArm`, 'RArm', 0, 50, '  ');
    result += numberField(`layer${num}_LArm`, 'LArm', 0, 50, '  ');
    result += numberField(`layer${num}_RLeg`, 'RLeg', 0, 50, '  ');
    result += numberField(`layer${num}_LLeg`, 'LLeg', 0, 50, '  ');
    result += numberField(`layer${num}_EV`, 'EV', 0, 50, '  ');
    result += selectField(`layer${num}_Type`, 'Type',
    ['soft: Soft', 'hard: Hard']
    , '  ');
  }

  // Gear section *******************************************
  result += comment('Gear');
  for(let i = 1; i < 31; i++) {
    let num =getNumber(i, 2) ;
    result += textField(`gearName_${num}`, 'Gear', 1, '  ');
  }

  result += comment('Notes and History');
  result += textField(`notes`, 'notes', 50, '  ');

  // output
  fs.writeFile(`cp2020WorldAnvilSheet.yml`, result, function (err) {
    if (err) {
      console.error('FAILED', err);
    }
  })
};
