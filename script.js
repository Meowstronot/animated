class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.update = this.update.bind(this);
    this.link = 'https://www.linkedin.com/in/muhammad-khisanul-fakhrudin-akbar/';
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);

    const promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.queue = [];

    const duration = 3;
    const steps = 50;
    const totalFrames = duration * steps;

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';

      const start = Math.floor(Math.random() * totalFrames);
      const end = start + Math.floor(Math.random() * totalFrames);

      this.queue.push({
        from,
        to,
        start,
        end
      });
    }

    cancelAnimationFrame(this.frameRequest);

    this.frame = 0;
    this.update();

    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from,
        to,
        start,
        end,
        char
      } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;

      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }

        output += char;

      } else {
        output += from;
      }
    }

    this.el.innerHTML = `
      <a
        href="${this.link}"
        target="_blank"
        rel="noopener noreferrer"
        class="scramble-link"
      >
        ${output}
      </a>
    `;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[
      Math.floor(Math.random() * this.chars.length)
    ];
  }
}


// TEXT
const phrases = [
  'MEOWSTRONOT',
  'KHISAN'
];

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;

const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  });

  counter = (counter + 1) % phrases.length;
};

next();


// AUTO REDIRECT SETELAH 10 DETIK
setTimeout(() => {
  window.location.href =
    'https://www.linkedin.com/in/muhammad-khisanul-fakhrudin-akbar/';
}, 10000);