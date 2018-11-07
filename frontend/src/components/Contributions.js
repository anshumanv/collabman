import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { GoMarkGithub } from 'react-icons/go';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
  },
  pos: {
    marginBottom: 12,
  },
  allCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class Contributions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePieIndex: 0,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activePieIndex: index,
    });
  };

  render() {
    const { classes } = this.props;
    const { activePieIndex } = this.state;
    const bull = <span className={classes.bullet}>•</span>;

    const { contributors } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Contributions
          </Typography>
          {this.props.contributorsFetched && this.props.currentProject ? (
            this.props.contributors.length ? (
              <div>
                <div>
                  Code contribution overview -{' '}
                  <a
                    target="_blank"
                    href={this.props.currentProject.project_link}
                  >
                    {this.props.currentProject.project_link}
                  </a>
                </div>
                <div className={classes.allCenter}>
                  <div
                    className={classes.allCenter}
                    style={{ flexDirection: 'column' }}
                  >
                    <GoMarkGithub size="2.5em" />
                    <div>Commit Count</div>
                  </div>
                  <PieChart width={800} height={400}>
                    <Pie
                      activeIndex={activePieIndex}
                      activeShape={renderActiveShape}
                      data={contributors}
                      cx={400}
                      nameKey="username"
                      dataKey="commits"
                      cy={200}
                      innerRadius={80}
                      outerRadius={120}
                      fill="#00af5b"
                      onMouseEnter={this.onPieEnter}
                    />
                  </PieChart>
                </div>
              </div>
            ) : (
              <div>
                Failed to fetch project contributors, please check your project
                link
              </div>
            )
          ) : (
            <div className={classes.allCenter}>
              <CircularProgress />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    name,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${name}: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

renderActiveShape.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  midAngle: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  fill: PropTypes.string,
  percent: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
};

Contributions.propTypes = {
  classes: PropTypes.object.isRequired,
  contributors: PropTypes.array,
  contributorsFetched: PropTypes.bool,
  currentProject: PropTypes.obj,
};

const mapStateToProps = state => {
  return {
    contributors: state.stats.contributors,
    contributorsFetched: state.stats.contributorsFetched,
    currentProject: state.projects.currentProject,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Contributions));
