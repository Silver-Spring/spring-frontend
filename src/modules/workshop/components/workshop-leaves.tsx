const LEAF = 'M0 60 C 20 10, 70 0, 120 6 C 112 50, 70 74, 0 60 Z';

export const WorkshopLeaves = () => (
  <>
    <svg
      viewBox="0 0 330 260"
      aria-hidden="true"
      className="pointer-events-none absolute -right-12 -top-10 w-60 blur-[2px] lg:w-80"
    >
      <g fill="oklch(0.62 0.12 135)" opacity=".75">
        <path transform="translate(150 20) rotate(70)" d={LEAF} />
        <path transform="translate(200 90) rotate(40) scale(1.2)" d={LEAF} />
        <path transform="translate(260 10) rotate(110) scale(.9)" d={LEAF} />
      </g>
      <path
        transform="translate(230 150) rotate(20) scale(1.3)"
        d={LEAF}
        fill="oklch(0.50 0.10 150)"
        opacity=".5"
      />
    </svg>
    <svg
      viewBox="0 0 200 160"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-10 -left-12 hidden w-48 blur-[2px] lg:block"
    >
      <g fill="oklch(0.68 0.11 130)" opacity=".6">
        <path transform="translate(60 150) rotate(-60) scale(1.1)" d={LEAF} />
        <path transform="translate(30 110) rotate(-20)" d={LEAF} />
      </g>
    </svg>
  </>
);
