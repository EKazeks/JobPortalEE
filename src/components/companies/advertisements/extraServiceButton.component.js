import React, { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button, ButtonGroup } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTooltip from '../../../utils/tooltip'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CheckIcon from '@material-ui/icons/Check'
import i18n from '../../../utils/i18n'

const styles = theme => ({
  activateService: {
    // display: 'flex',
    // margin: '50px 0 12px 0',
    // alignItems: 'end',
    // justifyContent: 'end',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      justifyContent: 'start',
    },
    width: '120%',
  },
  activateServiceForRus: {
    // display: 'flex',
    // margin: '50px 0 12px 0',
    // alignItems: 'end',
    // justifyContent: 'end',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      justifyContent: 'start',
    },
    width: '154%',
  },
  activeStatus: {
    backgroundColor: theme.palette.custom.activeGreen,
    '&:hover': {
      backgroundColor: theme.palette.custom.inactiveGreen,
    },
    color: 'white',
    lineHeight: 2,
    fontSize: 18,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      fontSize: 16,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  activateServiceBtn: {
    backgroundColor: theme.palette.custom.inactiveGreen,
    '&:hover': {
      backgroundColor: theme.palette.custom.activeGreen,
    },
    color: theme.palette.custom.white,
    lineHeight: 2,
    fontSize: 18,
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: 16,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
  },
  priceTagBtn: {
    backgroundColor: '#fff !important',
    border: '4px solid #E7E7E7 !important',
    fontSize: 20,
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
    },
    [theme.breakpoints.only('md')]: {
      fontSize: 18,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  priceTag: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  alvInfo: {
    fontSize: 18,
  },
  featureList: {
    display: 'flex',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  icon: {
    fontSize: 'small',
    marginRight: 15,
  },
  customWidth: {
    maxWidth: 600,
    backgroundColor: '#fff',
    border: '1px solid #88C0F7',
  },
  activateHelpInfo: {
    color: 'red',
    marginLeft: 14,
    marginBottom: 6,
    //float: 'right',

    [theme.breakpoints.down('xs')]: {
      marginBottom: 4,
    },
  },
  activateHelpInfoForEE: {
    color: 'red',
    marginLeft: 14,
    marginBottom: 6,
    //marginBottom: '-14px',
    //marginLeft: '-35px',
    //float: 'right',
    //marginTop: 14,
    //marginRight: '-23px',
    //width: '12%',
  },
  activateHelpInfoForRU: {
    color: 'red',
    marginLeft: 14,
    marginBottom: 6,
    // marginBottom: '-14px',
    // marginLeft: '-35px',
    // float: 'right',
    // marginTop: 14,
    // marginRight: '-23px',
    // width: '12%',
  },
});

const ExtraServiceButton = ({ classes, extraService, addExtraService, userRole }) => {
  const { t } = useTranslation('advertForm', 'campaigns');
  const [ isDesktop, setIsDesktop ] = useState(window.innerWidth)

  const changeSize = () => {
    setIsDesktop(window.innerWidth <= 777 )
  }

  useEffect(() => {
      window.addEventListener('resize', changeSize)
      return () => window.removeEventListener('resize', changeSize)
  })

  return (
    <>
      {userRole === 'company' && (
        <Grid container 
        className={i18n.language === 'ru' ? classes.activateServiceForRus : classes.activateService} 
        //style={ isDesktop && i18n.language === 'en' ? {width: '933px'} : null } 
        >
          <Grid item xs={12} sm={6} md={6}>
            <ButtonGroup onClick={() => addExtraService('help')}>
              <Button className={extraService?.help ? classes.activeStatus : classes.activateServiceBtn}>{t('activateHelpBtn')}</Button>
              <Button className={classes.priceTagBtn}>{t('helpPriceTag')}</Button>
            </ButtonGroup>
            <CustomTooltip
              title={
                <>
                  <div className={classes.priceTag}>
                    <span>{t('helpPriceTag')}</span>
                    <span className={classes.alvInfo}> {t('campaigns:alv')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('helpFeature1')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('helpFeature2')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('helpFeature3')}</span>
                  </div>
                </>
              }
              aria-label="more info"
              arrow
              placement="top-end"
              enterTouchDelay={50}
              classes={{ tooltip: classes.customWidth }}
            >
              <InfoOutlinedIcon className={classes.activateHelpInfo} />
            </CustomTooltip>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <ButtonGroup onClick={() => addExtraService('sos')}>
              <Button className={extraService?.sos ? classes.activeStatus : classes.activateServiceBtn}>{t('activateSosBtn')}</Button>
              <Button className={classes.priceTagBtn}>{t('sosPriceTag')}</Button>
            </ButtonGroup>
            <CustomTooltip
              title={
                <>
                  <div className={classes.priceTag}>
                    <span>{t('sosPriceTag')}</span>
                    <span className={classes.alvInfo}> {t('campaigns:alv')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('sosFeature1')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('sosFeature2')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('sosFeature3')}</span>
                  </div>
                  <div className={classes.featureList}>
                    <span>
                      <CheckIcon className={classes.icon} />
                    </span>
                    <span>{t('sosFeature4')}</span>
                  </div>
                </>
              }
              aria-label="more info"
              arrow
              placement="top-end"
              enterTouchDelay={50}
              classes={{ tooltip: classes.customWidth }}
            >
              <InfoOutlinedIcon className={classes.activateHelpInfo} />
            </CustomTooltip>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default withStyles(styles)(ExtraServiceButton);
