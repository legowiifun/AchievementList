export class gameJSON {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {string}
     */
    img;
    /**
     * @type {string}
     */
    platImg;
    /**
     * @type {achievementSetObject[]}
     */
    achievements = []
}

export class achievementObject {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {string}
     */
    description;
    /**
     * @type {string}
     */
    img;
    /**
     * @type {number}
     */
    outOf;
    /**
     * @type {string[]}
     */
    onlyOn=[];
    /**
     * @type {boolean | undefined}
     */
    hidden=false;
}
export class achievementSetObject {
    /**
     * @type {string}
     */
    image;
    /**
     * @type {string}
     */
    name;
    /**
     * @type {boolean}
     */
    requiredForPlat;
    /**
     * @type {string[]}
     */
    onlyOn=[];
    /**
     * @type {achievementObject[]}
     */
    achievements = [];
}