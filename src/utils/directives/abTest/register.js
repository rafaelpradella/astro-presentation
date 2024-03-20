/**
 * @type {() => import('astro').AstroIntegration}
 */
export default () => ({
  name: "client:onAbTest",
  hooks: {
    "astro:config:setup": ({ addClientDirective }) => {
      addClientDirective({
        name: "onAbTest",
        entrypoint: "./src/utils/directives/abTest/onAbTest",
      });
    },
  },
});

