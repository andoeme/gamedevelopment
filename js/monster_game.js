new Vue({
    el: '#app',
    data: {
        heroHealth: 100,
        enemyHealth: 100,
        log: [],
        widthHero: 'width: ' + 100 + '%',
        widthEnemy: 'width: ' + 100 + '%',
        level: 1,
        won: false,
        lost: false,
        playing: false,
        attackMultiplier: Math.random() * 10 + 10,
    },
    methods: {
        newGame: function() {
            this.heroHealth = 100;
            this.enemyHealth = 100;
            this.widthHero = 'width: ' + 100 + '%';
            this.widthEnemy = 'width: ' + 100 + '%';

            this.level = 1;
            this.log = [];
            this.playing = true;
        },
        nextLevel() {
            this.heroHealth = 100;
            this.enemyHealth = 100;
            this.widthHero = 'width: ' + 100 + '%';
            this.widthEnemy = 'width: ' + 100 + '%';

            this.level++;
            this.won = false;
            this.log = [];
            this.playing = true;
        },
        giveUp() {
            this.heroHealth = 0;
            this.widthHero = 'width: ' + 0 + '%';
            
            this.endGame()
            this.playing = false;
        },
        checkLevel() {
            switch(this.level){
                case 1: return Math.random() * 10 + 5;
                case 2: return Math.random() * 20 + 10;
                case 3: return Math.random() * 30 + 15; 
                case 4: return Math.random() * 40 + 20; 
                case 5: return Math.random() * 50 + 25; 
            }
        },
        attack() {
            let damage = (Math.random() * 10 + 5).toFixed(2);
            this.enemyHealth -= damage;
            this.log.unshift("You hit the monster for " + damage);
            this.widthEnemy = 'width: ' + this.enemyHealth + '%';

            this.endGame();

            damage = this.checkLevel().toFixed(2);
            this.heroHealth -= damage;
            this.log.unshift("The monster hits you for " + damage);
            this.widthHero = 'width: ' + this.heroHealth + '%';

            this.endGame();
        },
        specialAttack() {
            let damage = Math.random() * 20 + 10;
            this.enemyHealth -= damage;
            this.widthEnemy = 'width: ' + this.enemyHealth + '%';
            this.log.unshift("You hit the monster for " + damage);

            this.endGame();

            damage = this.checkLevel().toFixed(2);
            this.heroHealth -= damage;
            this.widthHero = 'width: ' + this.heroHealth + '%';
            this.log.unshift("The monster hits you for " + damage);

            this.endGame();
        },
        heal() {
            let damage = Math.random() * 50 + 25;
            this.heroHealth += damage;
            this.widthHero = 'width: ' + this.heroHealth + '%';
            this.log.unshift("You healed for " + damage);

            if(this.heroHealth > 100) {
                this.heroHealth = 100;
            }

            damage = this.checkLevel().toFixed(2);
            this.heroHealth -= damage;
            this.widthHero = 'width: ' + this.heroHealth + '%';
            this.log.unshift("The monster hits you for " + damage);

            this.endGame();
        },
        endGame() {
            if(this.heroHealth <= 0){
                this.heroHealth = 0;
                this.widthHero = 'width: ' + this.heroHealth + '%';
                this.won = false;
                this.lost = true;
                this.playing = false;
            } 
            else if(this.enemyHealth <= 0){
                this.enemyHealth = 0;
                this.widthEnemy = 'width: ' + 0 + '%';
                this.won = true;
                this.lost = false;
                this.playing = false;

                if(this.level == 5) {
                    alert("Wow, you beat the game!");
                }
            }
        }
    }
})