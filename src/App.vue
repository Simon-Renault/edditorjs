<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
:root {
    --geist-foreground: #000;
    --geist-background: #fff;
    --geist-selection: var(--geist-cyan);
    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999;
    --accents-4: #888;
    --accents-5: #666;
    --accents-6: #444;
    --accents-7: #333;
    --accents-8: #111;
    --geist-link-color: var(--geist-success);
    --geist-marketing-gray: #fafbfc;
    --geist-code: var(--geist-purple);
    --geist-success-light: #3291ff;
    --geist-success: #0070f3;
    --geist-success-dark: #0366d6;
    --geist-error-light: #ff1a1a;
    --geist-error: #e00;
    --geist-error-dark: #c00;
    --geist-warning-light: #f7b955;
    --geist-warning: #f5a623;
    --geist-warning-dark: #f49b0b;
    --geist-secondary-light: var(--accents-3);
    --geist-secondary: var(--accents-5);
    --geist-secondary-dark: var(--accents-7);
    --dropdown-box-shadow: 0 4px 4px 0 rgba(0,0,0,0.02);
    --dropdown-triangle-stroke: #fff;
    --scroller-start: #fff;
    --scroller-end: hsla(0,0%,100%,0);
    --shadow-smallest: 0px 4px 8px rgba(0,0,0,0.12);
    --shadow-small: 0 5px 10px rgba(0,0,0,0.12);
    --shadow-medium: 0 8px 30px rgba(0,0,0,0.12);
    --shadow-large: 0 30px 60px rgba(0,0,0,0.12);
    --shadow-hover: 0 30px 60px rgba(0,0,0,0.12);
    --shadow-sticky: 0 12px 10px -10px rgba(0,0,0,0.12);
    --portal-opacity: 0.25;
}
</style>
