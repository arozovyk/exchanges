package dao;

import entity.ReponseForum;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

import java.util.ArrayList;
import java.util.List;

public class ReponseForumDao {
    /**
     * Save ReponseForum
     * @param ReponseForum
     */
    public void saveReponseForum(ReponseForum ReponseForum) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(ReponseForum);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Update ReponseForum
     * @param ReponseForum
     */
    public void updateReponseForum(ReponseForum ReponseForum) {
        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.update(ReponseForum);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Delete ReponseForum
     * @param id
     */
    public void deleteReponseForum(int id) {

        Transaction transaction = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();

            // Delete a ReponseForum object
            ReponseForum ReponseForum = session.get(ReponseForum.class, id);
            if (ReponseForum != null) {
                session.delete(ReponseForum);
                System.out.println("ReponseForum is deleted");
            }

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
    }

    /**
     * Get ReponseForum By ID
     * @param id
     * @return
     */
    public ReponseForum getReponseForum(int id) {

        Transaction transaction = null;
        ReponseForum ReponseForum = null;
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an ReponseForum object
            ReponseForum = session.get(ReponseForum.class, id);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return ReponseForum;
    }

    /**
     * Get all ReponseForums
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<ReponseForum> getAllReponseForum(String id ) {

        Transaction transaction = null;
        List<ReponseForum> listOfReponseForum = new ArrayList<>();
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            // start a transaction
            transaction = session.beginTransaction();
            // get an ReponseForum object

            listOfReponseForum.addAll(session.createQuery("from ReponseForum where forum_message_id='"+id+"'").getResultList());

            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        }
        return listOfReponseForum;
    }
}
