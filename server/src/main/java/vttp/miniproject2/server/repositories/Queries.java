package vttp.miniproject2.server.repositories;

public class Queries {
    final public static String INSERT_NEW_ENTRY="insert into journal_entries ( user,quoteMessage ,author,thoughts,date,feeling) values ( ?,?,?,?,?, ?);";
    final public static String DELETE_ENTRY="delete from journal_entries where date=? and user =?";
    final public static String DELETE_USER_JOURNAL="delete from journal_entries where user=?";
    final public static String DELETE_USER="delete from user where username=?";
    final public static String DELETE_USER_ROLE="delete from user_role where user_id=?";
    final public static String GET_JOURNAL_BY_USER="select * from journal_entries where user like ?";
    final public static String GET_JOURNAL_BY_USER_AND_DATE="select * from journal_entries where user like ?";
}
