/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   linked_list.h                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/11 19:52:49 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 17:07:05 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef LIST_H
# define LIST_H

# include <stdio.h>
# include <stdlib.h>

typedef	struct	s_node
{
	int	data;
	struct s_node *next;
} 				t_node;

typedef struct	s_list
{
	int		cnt;
	t_node 	*head;
	t_node 	*tail;
}				t_list;
t_list			*makeList(void);
void			add_node(t_node **head, int data);
void			add_node_n(t_node **head, int n, int data);
void			add_node_next(t_node **head, t_node *prev, int data);
t_node			*create_node(int data);
void			print_node(t_node **head);
void			delete_node(t_node **head, int n);
t_node			*find_node(t_node **head, int data);
void			edit_node(t_node **head, t_node *edited, int data);
void			edit_all_node(t_node **head, int data, int edit_data);
int				node_size(t_node **head);
void			reverse(t_node **head);
#endif
