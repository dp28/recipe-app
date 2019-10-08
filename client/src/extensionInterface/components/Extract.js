import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles(theme => ({
  helpMultiple: {
    marginTop: theme.spacing(1)
  },
  content: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: grey[200],
    border: `1px solid ${grey[400]}`
  },
  expand: {
    transform: "rotate(0deg)",
    marginRight: theme.spacing(1),
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

export function UnconnectedExtract({
  dispatchRequest,
  waiting,
  property,
  value,
  children,
  propertyName,
  multiple = false,
  count = results => results.length
}) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {waiting && (
        <Typography>
          Click on the {propertyName}.
          {multiple && (
            <Typography className={classes.helpMultiple}>
              Each one should be highlighted separately.
            </Typography>
          )}
        </Typography>
      )}
      {value && !multiple && (
        <div className={classes.content}>{children(value)}</div>
      )}
      {value && multiple && (
        <div>
          <div>
            <IconButton
              className={`${classes.expand} ${
                expanded ? classes.expandOpen : ""
              }`}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
            >
              <ExpandMoreIcon />
            </IconButton>
            <span>
              Found {count(value)} {propertyName}
            </span>
          </div>
          <Collapse in={expanded} timeout="auto">
            <div className={classes.content}>{children(value)}</div>
          </Collapse>
        </div>
      )}
    </div>
  );
}

export function mapStateToProps(state, { property, propertyName }) {
  return {
    value: state.recipe[property],
    waiting:
      state.browserExtension.waiting &&
      state.browserExtension.currentStep === property,
    propertyName: propertyName || property
  };
}

export function mapDispatchToProps(dispatch, { requestBuilder }) {
  return {
    dispatchRequest: () => dispatch(requestBuilder())
  };
}

export const Extract = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedExtract);
