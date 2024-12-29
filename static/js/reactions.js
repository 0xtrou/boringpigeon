// Reactions.js - Stores all contextual reactions for the virtual pet pigeon

class PigeonReactions {
    static weatherReactions = {
        clear: {
            message: "Your pigeon basks in the warm sunlight!",
            variations: [
                "Spreads wings to soak up the sun ☀️",
                "Happily preening in the bright day 🌞",
                "Cooing contentedly in the sunshine ✨",
                "Dancing in the warm rays of light 💃",
                "Found a perfect sunny spot to rest 🌅",
                "Enjoying the beautiful weather! 🌤️",
                "Showing off its feathers in the sunlight ✨",
                "Strutting around proudly in the sun 🦚",
                "Taking a sunny dust bath 🌞",
                "Living its best life in the sunshine! 🌟"
            ],
            effect: (stats) => {
                stats.happiness = Math.min(100, stats.happiness + 5);
                return "☀️ ";
            }
        },
        partly_cloudy: {
            message: "Perfect weather for a gentle flight!",
            variations: [
                "Enjoying the mild weather ⛅",
                "Watching clouds drift by lazily 🌤️",
                "Perfect temperature for exploring 🗺️",
                "Hopping between sun and shade spots 🌥️",
                "Playing hide and seek with the clouds ☁️",
                "Feeling energetic in the fresh air 🌬️",
                "Making new friends under the clouds 🐦",
                "Practicing flight maneuvers 🕊️",
                "Finding treasures in the gentle breeze 🍂",
                "Having a wonderful outdoor adventure! 🌈"
            ],
            effect: () => "⛅ "
        },
        cloudy: {
            message: "The clouds make your pigeon a bit sleepy...",
            variations: [
                "Getting cozy under the cloud cover ☁️",
                "Feeling mellow in the gray weather 😴",
                "Settling in for a cloudy day nap 💤",
                "Watching the clouds roll by 🌥️",
                "Finding a comfy spot to rest 🛋️",
                "Daydreaming about sunshine ✨",
                "Quietly observing the world 👀",
                "Feeling philosophical today 🤔",
                "Perfect weather for meditation 🧘‍♂️",
                "Enjoying the peaceful atmosphere 🕊️"
            ],
            effect: (stats) => {
                stats.energy = Math.max(0, stats.energy - 5);
                return "☁️ ";
            }
        },
        rain: {
            message: "Your pigeon seeks shelter from the rain!",
            variations: [
                "Shaking water off feathers 🌧️",
                "Huddling under cover from the rain ☔",
                "Looking for a dry spot to perch 🏡",
                "Not a fan of getting wet! 💦",
                "Watching raindrops fall 💧",
                "Missing the sunshine ☀️",
                "Staying cozy and dry inside 🏠",
                "Listening to the rain patter 🌧️",
                "Preening extra carefully today 🪶",
                "Making the best of wet weather! 🌂"
            ],
            effect: (stats) => {
                stats.happiness = Math.max(0, stats.happiness - 10);
                return "🌧️ ";
            }
        },
        storm: {
            message: "Your pigeon is frightened by the storm!",
            variations: [
                "Startled by thunder ⛈️",
                "Feathers ruffled by strong winds 🌪️",
                "Seeking safety from the storm 🏠",
                "Hiding from lightning flashes ⚡",
                "Needs extra comfort right now 🤗",
                "Not enjoying this weather at all! 😨",
                "Staying close to shelter 🏡",
                "Wishing for calmer weather ✨",
                "A bit scared of the loud noises 😰",
                "Could use some reassurance 💕"
            ],
            effect: (stats) => {
                stats.happiness = Math.max(0, stats.happiness - 15);
                stats.energy = Math.max(0, stats.energy - 10);
                return "⛈️ ";
            }
        },
        snow: {
            message: "Your pigeon puffs up to stay warm in the snow!",
            variations: [
                "Fluffed up against the cold ❄️",
                "Leaving tiny footprints in the snow 👣",
                "Watching snowflakes fall gently ❄️",
                "All puffed up like a little snowball ⛄",
                "Trying to stay warm and cozy 🧊",
                "Making snow angels with its wings 👼",
                "Fascinated by the falling snow ✨",
                "Needs extra warmth today! 🧣",
                "Looking adorably round and fluffy 🐤",
                "Enjoying the winter wonderland! ⛄"
            ],
            effect: (stats) => {
                stats.energy = Math.max(0, stats.energy - 15);
                return "❄️ ";
            }
        }
    };

    static activityReactions = {
        eating: {
            hungry: [
                "The pigeon devours the food eagerly! 🌾",
                "Pecking enthusiastically at the seeds 🌱",
                "So hungry, eating everything in sight! 😋",
                "Finally, food! *happy munching* 🍽️",
                "Couldn't wait to start eating! 🌾",
                "Making happy food sounds 😊",
                "Absolutely loving this meal! 🎉",
                "Eating with great enthusiasm 💫",
                "This is exactly what was needed! 🌟",
                "The perfect time for a feast! 🍴"
            ],
            satisfied: [
                "Nibbling delicately at the food 🌱",
                "Taking time to select favorite seeds 🌾",
                "Enjoying a leisurely snack 😊",
                "Savoring each bite slowly 🍽️",
                "Appreciating the tasty treats 💝",
                "Content with the meal 😌",
                "Eating with proper pigeon manners 🎩",
                "Having a pleasant dining experience ✨",
                "Making sure to try everything 👀",
                "A perfectly portioned meal! 🍴"
            ],
            full: [
                "Already full, but takes a polite bite 🍃",
                "More interested in playing than eating 🎮",
                "Just pecking for fun now 😄",
                "Saving some for later maybe? 📦",
                "Feeling quite satisfied already! 😊",
                "Would rather explore than eat 🗺️",
                "Had enough for now 🌟",
                "Time for post-meal activities! 🎯",
                "Ready for something else 🎨",
                "Looking for after-dinner entertainment 🎭"
            ]
        },
        sleeping: {
            exhausted: [
                "Falls asleep instantly! 💤",
                "Barely made it to the sleeping spot 😴",
                "Drifting off to dreamland right away 🌙",
                "So tired, can't keep eyes open 🛏️",
                "Finally getting some rest 😪",
                "Deep sleep mode activated 🌟",
                "Sweet dreams coming right up 🌠",
                "Couldn't stay awake another second 💫",
                "The coziest nap ever 🛋️",
                "Peace and quiet at last... 🤫"
            ],
            tired: [
                "Settling in for a cozy nap 😴",
                "Finding the perfect sleeping position 🛏️",
                "Yawning and getting comfortable 🌙",
                "Ready for some rest and relaxation 💤",
                "Time for a peaceful snooze 😌",
                "Making a comfy nest 🪶",
                "Getting sleepy and calm 🌟",
                "Perfect time for a nap 🛋️",
                "Drowsy but content 😊",
                "Drifting off peacefully ✨"
            ],
            energetic: [
                "Too excited to sleep! 🌟",
                "Just pretending to nap 😄",
                "More interested in playing 🎮",
                "Can't sit still for long ⚡",
                "Trying to calm down... unsuccessfully! 😅",
                "Full of energy and life 💫",
                "Maybe just a quick rest? 😊",
                "Too many fun things to do! 🎯",
                "Sleep can wait! 🎨",
                "Ready for more adventures! 🗺️"
            ]
        },
        cleaning: {
            dirty: [
                "Taking a thorough bath! 💦",
                "Really needed this cleaning session 🛁",
                "Splashing around happily 💫",
                "Getting squeaky clean! ✨",
                "Extra attention to messy spots 🧼",
                "Enjoying a proper grooming 🪶",
                "Making sure to clean everywhere 💦",
                "The best feeling - getting clean! 🌟",
                "A much-needed bath time 🛁",
                "Fresh and clean coming up! ✨"
            ],
            normal: [
                "Preening feathers carefully ✨",
                "Enjoying the grooming routine 🪶",
                "Making sure every feather is perfect 💫",
                "Regular maintenance is important! 🧼",
                "Keeping up appearances 🎀",
                "A nice refreshing clean 💦",
                "Looking good, feeling good! 😊",
                "Taking pride in appearance ✨",
                "Maintaining that pigeon shine ⭐",
                "Just a touch of grooming 🌟"
            ],
            clean: [
                "Already spotless, but extra shine never hurts! ✨",
                "Just a quick touch-up 🌟",
                "Looking fabulous as always 💫",
                "Perfecting the perfect 🎀",
                "The cleanest pigeon around! 🪶",
                "Showing off that gleaming coat ✨",
                "Extra fabulous today 💎",
                "Sparkling clean and proud 🌟",
                "Maintaining that perfect look ⭐",
                "Because you can never be too clean! 💫"
            ]
        },
        cooing: {
            happy: [
                "Singing a cheerful tune! 🎵",
                "Cooing with pure joy 🎶",
                "Sharing the happiness through song 🎼",
                "Making the sweetest sounds 🎵",
                "Can't contain the happiness! 🎶",
                "Spreading joy through song 🎼",
                "The happiest little tune 🎵",
                "Music straight from the heart ❤️",
                "Dancing and singing along 💃",
                "A symphony of happiness! 🎶"
            ],
            neutral: [
                "Gentle cooing sounds 🎶",
                "Humming a quiet melody 🎵",
                "Soft, content sounds 🎼",
                "A peaceful little song 🎶",
                "Casual afternoon tune 🎵",
                "Just expressing thoughts 🎼",
                "Easy, relaxed cooing 🎶",
                "Simple melodies 🎵",
                "Comfortable sounds 🎼",
                "A calm musical moment 🎶"
            ],
            sad: [
                "A melancholic coo 🎵",
                "Trying to cheer up through song 🎶",
                "Seeking comfort in quiet sounds 🎼",
                "A little down today 😔",
                "Needs some cheering up 💕",
                "Hoping for better times 🌟",
                "Could use some company 🤗",
                "Singing the blues away 🎵",
                "A quiet, thoughtful tune 🎶",
                "Finding solace in song 🎼"
            ]
        },
        hunting: {
            eager: [
                "On the hunt with determination! 🎯",
                "Eyes locked on the target 👀",
                "Showing off hunting skills 💫",
                "Ready for the chase! 🏃",
                "Super focused right now 🔍",
                "Time to catch something! 🎯",
                "In full hunting mode 🦅",
                "Watch these expert moves! 💫",
                "The thrill of the hunt! 🎯",
                "Nothing can escape today! 🎨"
            ],
            playful: [
                "Making a game of the hunt! 🎮",
                "More playing than hunting 🎯",
                "Having fun chasing around 🎨",
                "Playful pursuit time! 🎭",
                "Such a fun game! 🎪",
                "Enjoying the chase 🎯",
                "Bouncing around happily 🦘",
                "What a merry hunt! 🎪",
                "Playing predator and prey 🎭",
                "The most fun activity! 🎨"
            ],
            tired: [
                "Taking it easy on this hunt 🦋",
                "Not really trying too hard 😴",
                "More watching than hunting 👀",
                "A very leisurely pursuit 🚶",
                "Conserving energy today 🌟",
                "Just casual observation 👁️",
                "No rush to catch anything 🦋",
                "Enjoying the slow pace 🐌",
                "A relaxed approach today 😌",
                "Maybe later... too tired now 💤"
            ]
        }
    };

    static accessoryReactions = {
        hat: {
            tophat: [
                "Looking quite distinguished in the top hat! 🎩",
                "Feeling fancy and sophisticated 🎭",
                "Ready for a formal occasion 👔",
                "Such a dapper appearance! ✨",
                "The classiest pigeon in town 🎩",
                "Strutting with style and grace 💫",
                "A true gentleman/lady pigeon 🎭",
                "Dressed for success! ⭐",
                "Making quite the impression 🌟",
                "The height of pigeon fashion! 🎩"
            ],
            bow: [
                "The bow looks absolutely adorable! 🎀",
                "Such a cute fashion choice 💝",
                "Sporting a stylish look ✨",
                "So precious with that bow! 🎀",
                "Fashion icon status achieved 💫",
                "Looking extra cute today 💕",
                "The sweetest accessory choice 🎀",
                "Absolutely charming! ✨",
                "Style and charm combined 💝",
                "Everyone loves the bow! 🎀"
            ],
            sunhat: [
                "Perfectly protected from the sun! ☀️",
                "Looking summer-ready and cool 🌞",
                "Enjoying the shade under the hat 🎩",
                "Ready for a sunny adventure! 🌅",
                "Staying cool in style 😎",
                "Beach vibes all day 🏖️",
                "Summer fashion on point! 🌞",
                "The perfect sunny day look ☀️",
                "Keeping cool and looking good 😎",
                "Ready for summer fun! 🌅"
            ],
            woolhat: [
                "Cozy and warm in the wool hat! 🧢",
                "Ready for winter weather ❄️",
                "Snug as can be 🧣",
                "Perfectly prepared for cold! 🌨️",
                "Staying toasty warm 🧢",
                "Winter fashion champion! ⛄",
                "The coziest little pigeon 🧣",
                "Warmth with style! ❄️",
                "Ready to brave the cold 🌨️",
                "Comfy and cute in wool! 🧢"
            ]
        },
        necklace: {
            bowtie: [
                "Looking dapper in the bow tie! 🎀",
                "Ready for a special occasion 🎭",
                "Such a distinguished look ✨",
                "Formal and fabulous! 👔",
                "The most elegant pigeon 🎀",
                "Dressed to impress! 💫",
                "Style icon status achieved 🌟",
                "Simply sophisticated! 🎭",
                "Making a fashion statement 💎",
                "Charm and grace personified! ✨"
            ],
            pendant: [
                "The pendant sparkles beautifully! ✨",
                "Showing off the shiny accessory 💎",
                "Looking extra fancy today 💫",
                "That pendant is eye-catching! 💎",
                "Jewelry model in the making ✨",
                "Absolutely stunning! 💫",
                "The perfect finishing touch 💎",
                "Radiating elegance ✨",
                "A touch of luxury 💎",
                "Simply gorgeous! 💫"
            ],
            scarf: [
                "Wrapped up warm and cozy! 🧣",
                "Ready for chilly weather ❄️",
                "Stylish and comfortable 🎀",
                "The perfect winter accessory! 🧣",
                "Staying warm in style ❄️",
                "Cozy fashion goals! 🧣",
                "Winter ready and adorable ⛄",
                "Snug and stylish! 🧣",
                "The coziest neckwear ❄️",
                "Warmth meets fashion! 🧣"
            ]
        },
        jacket: {
            winter_jacket: [
                "Snug and warm in the winter coat! 🧥",
                "Ready to brave the cold ❄️",
                "Perfectly prepared for winter ⛄",
                "Cozy and protected! 🧥",
                "Winter fashion on point ❄️",
                "The warmest little pigeon ⛄",
                "Staying toasty in style! 🧥",
                "Ready for snow days ❄️",
                "Warm and wonderful ⛄",
                "Winter weather champion! 🧥"
            ],
            rain_jacket: [
                "Protected from the rain in style! 🌧️",
                "Ready for wet weather ☔",
                "Keeping dry and fashionable 💦",
                "Prepared for any weather! 🌧️",
                "Stylish rain protection ☔",
                "No rain can dampen this look! 💦",
                "Weather-ready and cute 🌧️",
                "Rain or shine, looking fine! ☔",
                "Perfectly prepared for rain 💦",
                "Rainy day fashion icon! 🌧️"
            ],
            light_jacket: [
                "Perfect for a breezy day! 🌤️",
                "Just the right amount of warmth 🌸",
                "Stylishly prepared for mild weather 🍃",
                "Spring fashion ready! 🌤️",
                "Light and lovely 🌸",
                "The perfect seasonal look 🍃",
                "Casual cool vibes 🌤️",
                "Seasonal style on point! 🌸",
                "Ready for spring weather 🍃",
                "Looking fresh and fabulous! 🌤️"
            ]
        }
    };

    static getRandomVariation(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    static getAccessoryReaction(slot, itemId) {
        if (!itemId) return "Feeling lighter without the " + slot;
        return this.getRandomVariation(this.accessoryReactions[slot][itemId] || 
            ["Trying on something new!"]);
    }

    static getActivityReaction(activity, intensity) {
        // Map activity names to their corresponding keys in activityReactions
        const activityMap = {
            'feed': 'eating',
            'sleep': 'sleeping',
            'clean': 'cleaning',
            'coo': 'cooing',
            'hunt': 'hunting'
        };

        const mappedActivity = activityMap[activity] || activity;

        // Check if the activity exists
        if (!this.activityReactions[mappedActivity]) {
            console.warn(`Unknown activity: ${activity}`);
            return `The pigeon ${activity}s...`;
        }

        // Check if the intensity exists for this activity
        if (!this.activityReactions[mappedActivity][intensity]) {
            console.warn(`Unknown intensity ${intensity} for activity ${activity}`);
            // Return a default message from the activity's first intensity
            const firstIntensity = Object.keys(this.activityReactions[mappedActivity])[0];
            return this.getRandomVariation(this.activityReactions[mappedActivity][firstIntensity]);
        }

        return this.getRandomVariation(this.activityReactions[mappedActivity][intensity] || 
            [`Enjoying the ${activity}`]);
    }

    static getWeatherReaction(condition, stats) {
        const reaction = this.weatherReactions[condition];
        if (!reaction) return "Adapting to the weather";

        const message = this.getRandomVariation(reaction.variations);
        const emoji = reaction.effect(stats);
        return `${emoji} ${message}`;
    }
}

// Export for use in other files
window.PigeonReactions = PigeonReactions;