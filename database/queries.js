const queries = {
  allFromPlayers: 'SELECT * FROM players;',
  playersPrimaryData: `SELECT
	p.p_name AS 'Firstname',
    p.p_lastname AS 'Lastname',
    p.p_number AS 'Number',
    pn.nation AS 'Nationality',
    pp.p_position AS 'Position'
FROM playground pg
	INNER JOIN p_positions pp ON  pg.id_play=pp.id_play
	INNER JOIN players p ON p.id_position=pp.id_position
    INNER JOIN coaches c ON p.who_buy=c.id_coaches
    INNER JOIN players_nation pn ON p.nation=pn.id_p_nat
ORDER BY 3 ASC;`,
    addPlayer: function(p_position, p_name, p_lastname, p_number, strFoot, nation, whu_buy) {
      return 'INSERT INTO players VALUES (default, ' + parseInt(p_position) + ', \'' + p_name
      + '\', \'' + p_lastname + '\', ' + parseInt(p_number) + ', ' + parseInt(strFoot) + ', ' + parseInt(nation) +
      ', ' + parseInt(whu_buy) + ');'
    },
    selectPlayer: function(playerLastname) {
      return `SELECT
    	p.p_name AS 'Firstname',
        p.p_lastname AS 'Lastname',
        p.p_number AS 'Number',
        pn.nation AS 'Nationality',
        pp.p_position AS 'Position'
    FROM playground pg
    	INNER JOIN p_positions pp ON  pg.id_play=pp.id_play
    	INNER JOIN players p ON p.id_position=pp.id_position
      INNER JOIN coaches c ON p.who_buy=c.id_coaches
      INNER JOIN players_nation pn ON p.nation=pn.id_p_nat
    WHERE p.p_lastname = '${playerLastname}';`
  },
    createAccount: function(user, pass) {
      return `CREATE USER '${user}'@'localhost' IDENTIFIED BY '${pass}';`
    },
    grandPrivilages: function(user) {
      return `GRANT SELECT, INSERT, UPDATE ON liverpoolfc.* TO '${user}'@'localhost';`
    },
    flushPrivilages: `FLUSH PRIVILEGES;`,
    connectUser: function(user, pass) {
      return {
        host: 'localhost',
        user: user,
        password: pass,
        database: 'liverpoolfc'
      }
    },
    signInQuery: function(user, pass) {
      return `SELECT username, password FROM lfc_users WHERE
      username = '${user}' AND password = '${pass}';`;
    },
    createAccount: function(user, pass) {
      return `INSERT INTO lfc_users VALUES
      (default, '${user}', '${pass}');`;
    }
}

module.exports = queries;
