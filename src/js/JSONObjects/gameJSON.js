export class gameJSON {
    static achievementObject = class {
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
    }
    static achievementSetObject = class {
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