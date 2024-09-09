// theme/index.js
import {
  extendTheme,
  StyleFunctionProps,
  ThemeOverride,
  withDefaultProps,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { colors, fontColors } from "./colors";

const progressBaseStyle = () => ({
  track: {
    borderRadius: "8px",
  },
  filledTrack: {
    backgroundColor: "#02A0FC",
  },
});

const one: ThemeOverride = {
  // Other foundational style overrides go here
  fonts: {
    heading: "Rubik",
    body: "Rubik",
    mono: "Roboto Mono, monospace",
  },
  config: {
    useSystemColorMode: false,
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "light",
      },
      sizes: {
        md: {
          fontWeight: "400",
        },
      },
    },
    Link: {
      baseStyle: {
        textDecoration: "underline",
      },
    },

    Button: {
      baseStyle: {
        fontWeight: "400",
      },
    },
    Progress: {
      baseStyle: progressBaseStyle,
    },
    Avatar: {
      parts: ["container", "label", "badge"],
      baseStyle: {
        container: {
          fontWeight: "400",
        },
      },
      variants: {
        // this adds the default border style (::before is needed)
        withBorder: (props: StyleFunctionProps) => ({
          container: {
            "pos": "relative",
            "&::after": {
              content: "''",
              position: "absolute",
              height: "100%",
              width: "100%",
              borderRadius: "full",
              borderStyle: "solid",
              // borderWidth: "4px",
              borderWidth: props.size === "2xl" ? "4px" : "1px",
              // border: props.size ? 'xl' "2px solid",
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&>img": {
              boxSizing: "border-box",
            },
          },
        }),
      },
    },
    Divider: {
      baseStyle: {
        borderWidth: 1,
        borderColor: "neutrals.200",
      },
    },
    // Radio: radiocard,
    // ...radiocard,
    // Checkbox: checkbox,
  },
  // textStyles refer exactly to styles defined in the Figma designs.
  // see: https://www.figma.com/file/ziXjEufb8v3FVDZQo55ZK2/UI-Designs
  textStyles: {
    "Body/Small": {
      fontWeight: "400",
      color: fontColors.secondary.darkMode,
      fontSize: "14px",
    },
    "Body/SmallBold": {
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "140%",
    },
    "Body/ExtraSmall": {
      fontWeight: "400",
      color: fontColors.secondary.darkMode,
      lineHeight: "14.4px",
      fontSize: "12px",
    },
    "Body/LargeBold": {
      fontWeight: "500",
      color: fontColors.primary.darkMode,
      fontSize: "16px",
      lineHeight: "120%",
    },
    "Body/Medium": {
      fontWeight: "400",
      color: fontColors.primary.darkMode,
      fontSize: "16px",
      lineHeight: "22.4px",
    },
    "Heading/H1": {
      fontWeight: "300",
      color: fontColors.primary.darkMode,
      fontSize: "48px",
      fontStyle: "normal",
      lineHeight: "120%",
    },
    "Heading/Panel": {
      fontWeight: "400",
      color: "white",
      fontSize: "12px",
      fontStyle: "normal",
      lineHeight: "16px",
    },
    "Heading/H2": {
      fontWeight: "300",
      color: fontColors.primary.darkMode,
      fontSize: "34px",
      fontStyle: "normal",
      lineHeight: "120%",
    },
    "Heading/H3": {
      fontWeight: "normal",
      color: fontColors.primary.darkMode,
      fontSize: "20px",
      lineHeight: "120%",
    },
    "Heading/H4": {
      fontWeight: "500",
      color: fontColors.primary.darkMode,
      fontSize: "16px",
      lineHeight: "120%",
    },
    "Caption": {
      fontWeight: "400",
      color: fontColors.secondary.darkMode,
      fontSize: "14px",
    },
    "Caption/Italic": {
      fontWeight: "400",
      color: fontColors.secondary.darkMode,
      fontSize: "14px",
      fontStyle: "italic",
    },
    "Data/Heading": {
      fontWeight: "300",
      color: fontColors.primary.darkMode,
      fontSize: "34px",
      fontStyle: "normal",
      lineHeight: "40.8px",
    },
  },
  styles: {
    global: {
      p: {
        color: "#757575",
      },
    },
  },
  colors: colors,
};

const two: ThemeOverride = {
  components: {
    Button: {
      variants: {
        brandPrimary: (props: StyleFunctionProps) => ({
          px: props.size == "xs" ? 3 : props.size == "sm" ? "24px" : "32px",
          py: props.size == "sm" ? "10px" : "13px",
          color: "white",
          rounded: "full",
          bg: "brandBlue.300",
          _hover: {
            bg: "brandBlue.400",
            _disabled: {
              // nested _disabled is needed here to override base style
              bg: "brandBlue.300",
            },
          },
          _active: {
            bg: "brandBlue.400",
          },
          _disabled: {
            opacity: 0.2,
            bg: "brandBlue.300",
          },
          variant: "solid",
        }),
        brandSecondary: (props: StyleFunctionProps) => ({
          px: props.size == "xs" ? 3 : props.size == "sm" ? "24px" : "32px",
          py: props.size == "sm" ? "10px" : "13px",
          color: "neutrals.700",
          rounded: "full",
          bg: "white",
          borderWidth: "1px",
          borderColor: "neutrals.200",
          _hover: {
            bg: "neutrals.100",
            // nested _disabled is needed here to override style
            _disabled: {
              bg: "white",
            },
          },
          _active: {
            bg: "neutrals.200",
          },
          _disabled: {
            opacity: 0.2,
            bg: "white",
          },
          variant: "solid",
        }),
        secondary: {
          bg: "white",
        },
        danger: (props: StyleFunctionProps) => ({
          px: props.size == "xs" ? 3 : props.size == "sm" ? "24px" : "32px",
          py: props.size == "sm" ? "10px" : "13px",
          color: "white",
          rounded: "full",
          bg: "actionDanger.200",
          _hover: {
            bg: "actionDanger.200",
            _disabled: {
              // nested _disabled is needed here to override base style
              bg: "actionDanger.200",
            },
          },
          _active: {
            bg: "actionDanger.200",
          },
          _disabled: {
            opacity: 0.2,
            bg: "actionDanger.200",
          },
          variant: "solid",
        }),
      },
    },
    Breadcrumb: {
      // https://github.com/chakra-ui/chakra-ui/blob/main/packages/anatomy/src/index.ts#L43
      parts: ["link", "item", "container"],
      baseStyle: {
        container: {
          "&>ol>:not(:last-child)": { opacity: 0.7 },
        },
      },
    },
    Tooltip: {
      baseStyle: {
        "rounded": "md",
        "px": "8px",
        "py": "4px",
        "bg": "brandPurple.300",
        "--popper-arrow-bg": "colors.brandPurple.300",
      },
    },
    Tabs: {
      // https://github.com/chakra-ui/chakra-ui/blob/main/packages/anatomy/src/index.ts#L142
      parts: ["root", "tab", "tablist", "tabpanel", "tabpanels", "indicator"],
      variants: {
        brand: {
          tab: {
            borderBottom: "1px solid transparent",
            paddingBottom: "0px",
            // marginBottom: "-1px",
            mx: 1,
            px: 0,
            color: "neutrals.500",
            fontSize: "11px",
            // px: 5,
            textTransform: "uppercase",
            roundedTop: "md",
            // hover state
            _hover: {
              borderColor: "neutrals.500",
            },
            // 'Current' state
            _selected: {
              // fontWeight: 500,
              color: fontColors.secondary.darkMode,
              borderColor: "neutrals.200",
              borderBottomWidth: "1px",
            },

            // Disabled state
            _disabled: {
              opacity: 0.3,
              borderBottom: "none",
            },
          },
          tablist: {
            pb: 1,
            borderBottom: "none",
            borderColor: "neutrals.200",
          },
        },
      },
    },
    Alert: {
      // https://github.com/chakra-ui/chakra-ui/blob/main/packages/anatomy/src/index.ts#L20
      parts: ["title", "description", "container"],
      variants: {
        brand: {
          container: {
            "bg": "white",
            "border": "1px solid #E5E5E5",
            "rounded": "lg",
            "&>button>svg": {
              color: "neutrals.300",
            },
            "px": 6,
            "py": 4,
          },
          title: {
            textStyle: "Body/Small",
            fontWeight: "bold",
          },
          description: {
            textStyle: "Body/Small",
            color: "#757575",
          },
        },
      },
    },
    Select: {
      // https://github.com/chakra-ui/chakra-ui/blob/main/packages/anatomy/src/index.ts#L108
      parts: ["field", "icon"],
      baseStyle: {
        field: {
          outline: "none",
          _focus: {
            borderColor: "brandBlue.100",
            borderWidth: "2px",
            outline: "none",
            outlineWidth: "0px",
          },
          _focusWithin: {
            borderColor: "brandBlue.100",
            borderWidth: "2px",
            outline: "none",
            outlineWidth: "0px",
          },
          _focusVisible: {
            outline: "none",
            outlineWidth: "0px",
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "6px",
          height: "40px",
          paddingTop: "10px",
          paddingBottom: "8px",
          paddingLeft: "12px",
          paddingRight: "20px",

          textStyle: "Body/Medium",
          _placeholder: { color: "neutrals.400" },
          // marginY: '8px',
          _focus: {
            borderColor: "brandBlue.100",
            // borderWidth: "2px",
            boxShadow: "inset 0 0 0 1px #94bdff",
          },
          _hover: {
            borderColor: "brandBlue.100",
            // borderWidth: "2px",
            boxShadow: "inset 0 0 0 1px #94bdff",
          },
          _error: { borderColor: "actionDanger.200", border: "1px" },
          _focusWithin: {
            borderColor: "brandBlue.100",
            // borderWidth: "2px",
            boxShadow: "inset 0 0 0 1px #94bdff",
          },
        },
        addon: {
          borderColor: "neutrals.400",
          borderWidth: "1px",
          border: "1px",
          bg: "transparent",
        },
      },
      defaultProps: {
        variants: null,
      },
    },
    NumberInput: {
      parts: ["root", "field", "stepperGroup", "stepper"],
      variants: {
        reveal: {
          field: {
            _focusWithin: {
              boxShadow: "outline",
            },
          },
          stepperGroup: {
            transition: "all .05s ease-in-out",
            _groupFocusWithin: {
              opacity: 1,
            },
            opacity: 0,
          },
        },
      },
    },
    FormLabel: {
      baseStyle: {},
      variants: {
        label: {
          textStyle: "Body/Medium",
          fontWeight: "400",
          color: "#2D2F30",
          fontSize: "16px",
          lineHeight: "22.4px",
          paddingBottom: "0px",
          marginBottom: "0px",
        },
      },
    },
    // Other components go here
  },
};

const three = withDefaultProps({
  defaultProps: {
    variant: "brandPrimary", // this will set the default variant to `brandPrimary` as specified above
  },
  components: ["Button"],
});

const four = withDefaultProps({
  defaultProps: {
    variant: "brand", // this will set the default variant to `brand` as specified above
  },
  components: ["Tabs"],
});

const bg: ThemeOverride = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "#1c1c1e")(props),
      },
      p: {
        color: mode(
          fontColors.secondary.lightMode,
          fontColors.secondary.darkMode
        )(props),
      },
    }),
  },
};

export const theme = extendTheme(one, two, three, four, bg);
